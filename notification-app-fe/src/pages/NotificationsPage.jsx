
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Chip, Card, CardContent, Pagination } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { fetchNotifications } from '../api/notifications';
import { useNotifications } from '../hooks/useNotifications';
import NotificationFilter from '../components/NotificationFilter';
import { customLogger } from '../../../logging-middleware/logger';

export default function NotificationsPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [viewedIds, setViewedIds] = useState(new Set());
  
  // Evaluation API tracking query parameters
  const [filterType, setFilterType] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { processPriorityInbox } = useNotifications();

  useEffect(() => {
    async function loadData() {
      const data = await fetchNotifications({ page, limit, filterType });
      setNotifications(data);
    }
    loadData();
  }, [page, limit, filterType]);

  const handleItemClick = (id) => {
    setViewedIds(prev => {
      const nextSet = new Set(prev);
      nextSet.add(id);
      return nextSet;
    });
    customLogger('DEBUG', 'Registered unread-to-read state mutation element update interaction', { id });
  };

  const displayedList = currentTab === 0 
    ? notifications 
    : processPriorityInbox(notifications, limit);

  return (
    <Container maxWidth="md" style={{ marginTop: '24px' }}>
      <AppBar position="static" style={{ borderRadius: 8 }}>
        <Toolbar>
          <Typography variant="h6">Campus Notifications Board Portal</Typography>
        </Toolbar>
      </AppBar>

      <Tabs 
        value={currentTab} 
        onChange={(e, val) => {
          setCurrentTab(val);
          customLogger('INFO', 'View navigation tab transition triggered', { targetedTab: val === 0 ? 'All Streams' : 'Priority Matrix' });
        }} 
        centered 
        sx={{ mt: 2 }}
      >
        <Tab icon={<AssignmentIcon />} label="All Streams" />
        <Tab icon={<NotificationImportantIcon />} label="Priority Matrix" />
      </Tabs>

      <NotificationFilter 
        filterType={filterType} 
        setFilterType={setFilterType} 
        limit={limit} 
        setLimit={setLimit} 
      />

      <Card variant="outlined">
        <CardContent style={{ padding: 8 }}>
          <List>
            {displayedList.length === 0 ? (
              <Box py={4} textAlign="center">
                <Typography color="textSecondary">No notifications present matching criteria selections.</Typography>
              </Box>
            ) : (
              displayedList.map(item => {
                const isRead = viewedIds.has(item.ID);
                return (
                  <ListItem 
                    key={item.ID} 
                    divider 
                    button 
                    onClick={() => handleItemClick(item.ID)}
                    style={{ 
                      backgroundColor: isRead ? '#fafafa' : '#e3f2fd', 
                      marginBottom: '8px', 
                      borderRadius: 4 
                    }}
                  >
                    <ListItemText 
                      primary={item.Message} 
                      secondary={`${item.Timestamp} — Status State: ${isRead ? 'Viewed' : 'Unread'}`}
                      primaryTypographyProps={{ fontWeight: isRead ? 'normal' : 'bold' }}
                    />
                    <Chip 
                      label={item.Type} 
                      color={item.Type === 'Placement' ? 'error' : item.Type === 'Result' ? 'warning' : 'info'} 
                      size="small" 
                    />
                  </ListItem>
                );
              })
            )}
          </List>
        </CardContent>
      </Card>

      {currentTab === 0 && displayedList.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3} pb={4}>
          <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} color="primary" />
        </Box>
      )}
    </Container>
  );
}
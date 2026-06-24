
import { customLogger } from '../../../logging-middleware/logger';

export async function fetchNotifications({ page = 1, limit = 10, filterType = '' } = {}) {
  try {
    customLogger('INFO', 'Starting to fetch notifications', { page, limit, filterType });

    
    let url = `https://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;
    if (filterType) {
      url += `&notification_type=${filterType}`;
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWhlc2h0aGlydTA5MDQyMDA2QGdtYWlsLmNvbSIsImV4cCI6MTc4MjI4MjMzNywiaWF0IjoxNzgyMjgxNDM3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGJlOGI1ODYtOTljMi00NDgzLWI4Y2UtNTc5YmNmOWI1MzRkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFoZXNoIiwic3ViIjoiMzFjYWRlZDItYTlmNi00Zjg3LTlhOWQtZTBiMDcxOWY3MTYyIn0sImVtYWlsIjoibWFoZXNodGhpcnUwOTA0MjAwNkBnbWFpbC5jb20iLCJuYW1lIjoibWFoZXNoIiwicm9sbE5vIjoiODEwNDIzMjA1MTAwIiwiYWNjZXNzQ29kZSI6IlFXSnVGZiIsImNsaWVudElEIjoiMzFjYWRlZDItYTlmNi00Zjg3LTlhOWQtZTBiMDcxOWY3MTYyIiwiY2xpZW50U2VjcmV0IjoiUllZRlpzUm5GZ3dlQ1ZwVCJ9.kBo_tpb073i_FY8aH1ywlxFiixJFXEWsw-Bm5snjyoc";

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    customLogger('INFO', 'Successfully fetched notifications data');
    
    // Fallback verification: Map both common payload data object fields
    return data.notifications || data.data || data || [];
  } catch (error) {
    customLogger('ERROR', 'Error fetching notifications', { error: error.message });
    return [];
  }
}

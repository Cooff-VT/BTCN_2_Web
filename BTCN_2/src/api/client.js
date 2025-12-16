export const BASE_URL = 'https://34.124.214.214:2423/api';

let userAuthToken = localStorage.getItem('authToken') || null;

export const setAuthToken = (token) => {
    userAuthToken = token;
    localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
    userAuthToken = null;
    localStorage.removeItem('authToken');
};

export const fetchClient = async (endpoint, options = {}) => {
    const body = options.data ? JSON.stringify(options.data) : options.body;
    
    const headers = {
        'Content-Type': 'application/json',
        'x-app-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo',
        
        ...(userAuthToken && { 'Authorization': `Bearer ${userAuthToken}` }),

        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        method: options.method || 'GET',
        headers,
        body,
    });

    if (!response.ok) {
        const errorText = await response.text();
        try {
             const errorJson = JSON.parse(errorText);
             throw errorJson;
        } catch (e) {
             throw { message: `API Error ${response.status}: ${errorText.substring(0, 100)}` };
        }
    }

    const text = await response.text();
    return text ? JSON.parse(text) : { success: true };
};
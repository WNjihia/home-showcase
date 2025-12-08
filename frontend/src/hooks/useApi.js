import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api';

/**
 * Hook for fetching property with all rooms
 */
export function usePropertyWithRooms() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/property/full`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch property');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for submitting viewing requests
 */
export function useViewingRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitRequest = useCallback(async (requestData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(`${API_BASE}/viewing-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.detail) {
          if (Array.isArray(result.detail)) {
            const messages = result.detail.map(err => err.msg).join(', ');
            throw new Error(messages);
          }
          throw new Error(result.detail);
        }
        throw new Error('Failed to submit request');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { submitRequest, loading, error, success, reset };
}

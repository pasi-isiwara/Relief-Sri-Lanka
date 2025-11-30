import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ReliefRequest, ReliefRequestInput } from '../types';
export function useRequests() {
  const [requests, setRequests] = useState<ReliefRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const q = query(collection(db, 'relief_requests'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      })) as ReliefRequest[];
      setRequests(requestsData);
      setLoading(false);
      setError(null);
    }, err => {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const addRequest = async (request: ReliefRequestInput): Promise<boolean> => {
    try {
      await addDoc(collection(db, 'relief_requests'), {
        ...request,
        timestamp: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error('Error adding request:', err);
      return false;
    }
  };
  return {
    requests,
    loading,
    error,
    addRequest
  };
}
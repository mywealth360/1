// RD Station Worker
// This module handles sending data to RD Station in the background

interface RDStationData {
  email: string;
  name?: string;
  phone?: string;
  tags?: string[];
  traffic_source?: string;
  identificador?: string;
  [key: string]: any;
}

// Function to send data to RD Station
export async function sendToRDStation(data: RDStationData, identifier?: string): Promise<any> {
  try {
    console.log(`Sending data to RD Station: ${identifier || data.identificador || 'No identifier'}`);
    
    // Store in localStorage as backup
    const timestamp = new Date().toISOString();
    const storageKey = `rd_station_${timestamp}`;
    localStorage.setItem(storageKey, JSON.stringify({
      ...data,
      timestamp,
      status: 'pending'
    }));
    
    // Attempt to process immediately
    return await processPendingData();
  } catch (error) {
    console.error('Error sending to RD Station:', error);
    return { success: false, error };
  }
}

// Function to process pending data
export async function processPendingData(): Promise<any> {
  try {
    // Find all pending RD Station data in localStorage
    const pendingData: RDStationData[] = [];
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('rd_station_') || key === 'rd_station_pending' || key === 'robot_request_pending')) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          if (item.email) {
            pendingData.push(item);
            keysToRemove.push(key);
          }
        } catch (e) {
          console.error(`Error parsing localStorage item ${key}:`, e);
        }
      }
    }
    
    if (pendingData.length === 0) {
      return { success: true, message: 'No pending data to process' };
    }
    
    console.log(`Found ${pendingData.length} pending RD Station items to process`);
    
    // Process each item
    const results = await Promise.all(pendingData.map(async (item) => {
      try {
        // Prepare data for RD Station
        const rdData = {
          ...item,
          cf_source: item.traffic_source || document.referrer || 'Direct',
          identificador: item.identificador || 'Website Lead'
        };
        
        // Send to RD Station via our server endpoint
        const response = await fetch('/api/rd-station', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rdData)
        });
        
        if (!response.ok) {
          throw new Error(`RD Station API error: ${response.status}`);
        }
        
        return { success: true, email: item.email };
      } catch (error) {
        console.error(`Error processing RD Station data for ${item.email}:`, error);
        return { success: false, email: item.email, error };
      }
    }));
    
    // Remove processed items from localStorage
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    return { success: true, results };
  } catch (error) {
    console.error('Error processing pending RD Station data:', error);
    return { success: false, error };
  }
}

// Function to start periodic processing
export function startPeriodicProcessing(intervalMs = 60000): void {
  // Process immediately
  processPendingData().catch(console.error);
  
  // Set up interval for periodic processing
  setInterval(() => {
    processPendingData().catch(console.error);
  }, intervalMs);
}
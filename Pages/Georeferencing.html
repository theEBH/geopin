import { useState, useEffect } from 'react';
import { Location } from '@/entities/Location';
import { User } from '@/entities/User';
import MapPicker from '../components/map/MapPicker';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function GeoreferencingPage() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const userData = await User.me();
        setUser(userData);
        await fetchNextLocation(userData.email);
      } catch (err) {
        setError("Failed to initialize. Please try again or log in if you haven't already.");
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const fetchNextLocation = async (userEmail) => {
    try {
      setIsLoading(true);
      // Find a location that is active and hasn't been answered by this user
      const locations = await Location.filter({
        is_active: true
      });
      
      const availableLocation = locations.find(loc => 
        !loc.answers?.some(answer => answer.user_email === userEmail) &&
        (loc.answers?.length || 0) < 3
      );

      if (!availableLocation) {
        setError("No more locations available for georeferencing at this time.");
        setCurrentLocation(null);
        return;
      }

      setCurrentLocation(availableLocation);
      setError(null);
    } catch (err) {
      setError("Failed to fetch next location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (coordinates) => {
    try {
      setIsLoading(true);
      const updatedAnswers = [
        ...(currentLocation.answers || []),
        {
          ...coordinates,
          user_email: user.email
        }
      ];

      // Update the location with the new answer
      await Location.update(currentLocation.id, {
        answers: updatedAnswers,
        is_active: updatedAnswers.length < 3
      });

      // Update submission count
      setSubmissionCount(prev => prev + 1);

      // Fetch next location
      await fetchNextLocation(user.email);
    } catch (err) {
      setError("Failed to submit location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !currentLocation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
          <p className="mt-2">Loading georeferencing data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto py-8">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        
        {submissionCount > 0 && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">Thank you for your contributions!</p>
              </div>
              <p className="mt-2 text-green-600">
                You've successfully georeferenced {submissionCount} location{submissionCount !== 1 ? 's' : ''}.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto py-8">
      {submissionCount > 0 && (
        <div className="mb-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            {submissionCount} location{submissionCount !== 1 ? 's' : ''} georeferenced
          </Badge>
        </div>
      )}
      
      <Card className="mb-6 border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            Location Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            {currentLocation?.description || 'Loading...'}
          </p>
        </CardContent>
        <CardFooter className="bg-blue-50 text-sm text-blue-700 border-t border-blue-100">
          Point to where you think this location is on the map below
        </CardFooter>
      </Card>

      {currentLocation && (
        <MapPicker onLocationSelect={handleLocationSelect} />
      )}
    </div>
  );
}
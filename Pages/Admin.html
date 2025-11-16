import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: () => base44.entities.Location.list('-created_date'),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (description) => base44.entities.Location.create({
      description,
      is_active: true,
      answers: []
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      setNewDescription('');
      setError(null);
    },
    onError: (err) => {
      setError('Failed to create location');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Location.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (err) => {
      setError('Failed to delete location');
    }
  });

  const handleCreate = () => {
    if (!newDescription.trim()) return;
    createMutation.mutate(newDescription);
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());

    const locations = lines.map(line => ({
      description: line.trim(),
      is_active: true,
      answers: []
    }));

    try {
      await base44.entities.Location.bulkCreate(locations);
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      setError(null);
    } catch (err) {
      setError('Failed to upload locations');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Location Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter location description..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={3}
          />
          <div className="flex gap-4">
            <Button onClick={handleCreate} disabled={!newDescription.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
            
            <div>
              <input
                type="file"
                accept=".txt,.csv"
                onChange={handleBulkUpload}
                className="hidden"
                id="bulk-upload"
              />
              <label htmlFor="bulk-upload">
                <Button variant="outline" asChild>
                  <span>Upload Text File (one per line)</span>
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Locations ({locations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : locations.length === 0 ? (
            <p className="text-gray-500">No locations yet</p>
          ) : (
            <div className="space-y-3">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-sm">{location.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant={location.is_active ? "default" : "secondary"}>
                        {location.is_active ? 'Active' : 'Completed'}
                      </Badge>
                      <Badge variant="outline">
                        {location.answers?.length || 0} / 3 responses
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(location.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
 
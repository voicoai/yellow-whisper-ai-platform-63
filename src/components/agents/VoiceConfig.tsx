
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function VoiceConfig() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice Configuration</CardTitle>
        <CardDescription>Customize how your agent sounds using ElevenLabs voices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="voice-selection">Voice Selection</Label>
          <Select defaultValue="aria">
            <SelectTrigger id="voice-selection">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aria">Aria (Female, Professional)</SelectItem>
              <SelectItem value="roger">Roger (Male, Friendly)</SelectItem>
              <SelectItem value="sarah">Sarah (Female, Casual)</SelectItem>
              <SelectItem value="george">George (Male, Authoritative)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="p-4 bg-voico-blue-50 border border-voico-blue-200 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Voice Preview</h3>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Play Sample
            </Button>
          </div>
          <div className="text-sm text-gray-700">
            <p>"Hello, I'm your VOICO AI assistant. How may I help you today?"</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="stability">Voice Stability</Label>
            <Slider 
              defaultValue={[75]} 
              max={100} 
              step={1}
              id="stability"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Variable (Creative)</span>
              <span>Stable (Consistent)</span>
            </div>
          </div>
          <div className="space-y-4">
            <Label htmlFor="clarity">Voice Clarity & Enhancement</Label>
            <Slider 
              defaultValue={[65]} 
              max={100} 
              step={1} 
              id="clarity"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Natural</span>
              <span>Enhanced</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="speed">Speech Speed</Label>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" className="h-8 w-8">-</Button>
              <Slider 
                defaultValue={[1]} 
                min={0.5}
                max={2} 
                step={0.1} 
                id="speed"
              />
              <Button variant="outline" size="icon" className="h-8 w-8">+</Button>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">ElevenLabs API Key</Label>
            <Input type="password" id="api-key" placeholder="Enter your API key" />
            <p className="text-xs text-gray-500">Required to use voice services</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Cost Estimation</Label>
          <div className="p-4 bg-voico-yellow-50 border border-voico-yellow-200 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Voice Cost Per Minute</h3>
                <p className="text-sm text-gray-600">Based on current settings</p>
              </div>
              <div className="text-xl font-bold text-voico-blue-800">$0.064</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

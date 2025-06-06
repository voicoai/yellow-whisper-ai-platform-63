
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Globe, MessageSquare, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface KnowledgeBaseEditorProps {
  kb: any;
  onBack: () => void;
}

export function KnowledgeBaseEditor({ kb, onBack }: KnowledgeBaseEditorProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("files");
  const [files, setFiles] = useState(kb.files || []);
  const [urls, setUrls] = useState(kb.urls || []);
  const [texts, setTexts] = useState(kb.texts || []);
  const [newUrl, setNewUrl] = useState("");
  const [newTextTitle, setNewTextTitle] = useState("");
  const [newTextContent, setNewTextContent] = useState("");

  const form = useForm({
    defaultValues: {
      title: kb.title,
      description: kb.description,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile = {
        name: file.name,
        type: file.name.split('.').pop(),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setFiles([...files, newFile]);
      toast({
        title: "File uploaded",
        description: `${file.name} has been added to the knowledge base.`,
      });
    }
  };

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      const newUrlObj = {
        url: newUrl,
        title: new URL(newUrl).hostname,
        lastCrawled: new Date().toISOString().split('T')[0]
      };
      setUrls([...urls, newUrlObj]);
      setNewUrl("");
      toast({
        title: "URL added",
        description: "The URL has been added to the knowledge base.",
      });
    }
  };

  const handleAddText = () => {
    if (newTextTitle.trim() && newTextContent.trim()) {
      const newTextObj = {
        title: newTextTitle,
        content: newTextContent,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setTexts([...texts, newTextObj]);
      setNewTextTitle("");
      setNewTextContent("");
      toast({
        title: "Text content added",
        description: "The text content has been added to the knowledge base.",
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleRemoveText = (index: number) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Knowledge Bases
        </Button>
        <div className="h-6 w-px bg-gray-300"></div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Knowledge Base</h1>
          <p className="text-sm text-gray-600 mt-1">Manage content and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Panel */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="text-lg font-medium text-gray-900">Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium">
                Save Changes
              </Button>
            </Form>
          </CardContent>
        </Card>

        {/* Content Management */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-lg grid-cols-3 bg-gray-100">
              <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Files ({files.length})
              </TabsTrigger>
              <TabsTrigger value="urls" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                URLs ({urls.length})
              </TabsTrigger>
              <TabsTrigger value="texts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Text ({texts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="mt-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                  <CardTitle className="text-lg font-medium text-gray-900">File Management</CardTitle>
                  <CardDescription>Upload and manage document files</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-[#FDDF5C] mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        Choose Files
                      </Button>
                    </div>
                    
                    {files.map((file: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                            <Upload size={16} className="text-[#FDDF5C]" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                          <Trash2 size={14} className="text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="urls" className="mt-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                  <CardTitle className="text-lg font-medium text-gray-900">URL Management</CardTitle>
                  <CardDescription>Add websites and web pages</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter URL (e.g., https://example.com)"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                      />
                      <Button onClick={handleAddUrl} className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black">
                        <Plus size={16} className="mr-2" />
                        Add
                      </Button>
                    </div>
                    
                    {urls.map((url: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                            <Globe size={16} className="text-[#FDDF5C]" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{url.title}</p>
                            <p className="text-xs text-gray-500">{url.url}</p>
                            <p className="text-xs text-gray-400">Last crawled: {url.lastCrawled}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveUrl(index)}>
                          <Trash2 size={14} className="text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="texts" className="mt-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                  <CardTitle className="text-lg font-medium text-gray-900">Text Content</CardTitle>
                  <CardDescription>Add custom text content</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Content title"
                        value={newTextTitle}
                        onChange={(e) => setNewTextTitle(e.target.value)}
                      />
                      <Textarea
                        placeholder="Enter your text content here..."
                        value={newTextContent}
                        onChange={(e) => setNewTextContent(e.target.value)}
                        rows={4}
                      />
                      <Button onClick={handleAddText} className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black">
                        <Plus size={16} className="mr-2" />
                        Add Text
                      </Button>
                    </div>
                    
                    {texts.map((text: any, index: number) => (
                      <div key={index} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#FDDF5C]/20 rounded-md mt-1">
                            <MessageSquare size={16} className="text-[#FDDF5C]" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{text.title}</p>
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">{text.content}</p>
                            <p className="text-xs text-gray-400 mt-1">Created: {text.createdDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveText(index)}>
                          <Trash2 size={14} className="text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Database, Globe, FileText, MessageSquare, ArrowLeft, ExternalLink, MoreHorizontal, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ConnectAgentDialog } from "@/components/knowledgebases/ConnectAgentDialog";
import { useForm } from "react-hook-form";
const KnowledgeBases = () => {
  const {
    toast
  } = useToast();
  const [selectedKB, setSelectedKB] = useState<any>(null);
  const [connectingKB, setConnectingKB] = useState<any>(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [detailActiveTab, setDetailActiveTab] = useState("files");
  const [isEditing, setIsEditing] = useState(false);
  const [knowledgeBasesState, setKnowledgeBasesState] = useState([{
    id: "kb-1",
    title: "Product Documentation",
    description: "Documentation for our SaaS product",
    type: "document" as const,
    sources: 3,
    files: [{
      name: "API_Documentation.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-06-01"
    }, {
      name: "User_Guide.docx",
      type: "docx",
      size: "1.8 MB",
      uploadDate: "2024-06-02"
    }, {
      name: "FAQ.txt",
      type: "txt",
      size: "45 KB",
      uploadDate: "2024-06-03"
    }],
    urls: [],
    texts: []
  }, {
    id: "kb-2",
    title: "FAQ Database",
    description: "Frequently asked questions and answers",
    type: "text" as const,
    sources: 12,
    files: [],
    urls: [],
    texts: [{
      title: "General FAQ",
      content: "What is our product?",
      createdDate: "2024-05-15"
    }, {
      title: "Billing FAQ",
      content: "How does billing work?",
      createdDate: "2024-05-16"
    }, {
      title: "Technical FAQ",
      content: "Technical support questions",
      createdDate: "2024-05-17"
    }]
  }, {
    id: "kb-3",
    title: "Company Website",
    description: "Content from company website and blog",
    type: "website" as const,
    sources: 8,
    files: [],
    urls: [{
      url: "https://company.com/about",
      title: "About Us",
      lastCrawled: "2024-06-05"
    }, {
      url: "https://company.com/products",
      title: "Products",
      lastCrawled: "2024-06-05"
    }, {
      url: "https://company.com/blog",
      title: "Blog",
      lastCrawled: "2024-06-04"
    }],
    texts: []
  }]);
  const handleCreateKnowledgeBase = () => {
    toast({
      title: "Coming Soon",
      description: "Knowledge Base creation will be available soon."
    });
  };
  const handleViewKB = (kb: any) => {
    setSelectedKB(kb);
    setIsEditing(false);
  };
  const handleEditKB = (kb: any) => {
    setSelectedKB(kb);
    setIsEditing(true);
  };
  const handleConnectKB = (kb: any) => {
    setConnectingKB(kb);
    setConnectDialogOpen(true);
  };
  const handleDuplicateKB = (kb: any) => {
    const duplicatedKB = {
      ...kb,
      id: `kb-${Date.now()}`,
      title: `${kb.title} (Copy)`
    };
    setKnowledgeBasesState(prev => [...prev, duplicatedKB]);
    toast({
      title: "Knowledge Base Duplicated",
      description: `"${kb.title}" has been successfully duplicated.`
    });
  };
  const handleDeleteKB = (kb: any) => {
    setKnowledgeBasesState(prev => prev.filter(item => item.id !== kb.id));

    // If we're currently viewing the deleted KB, go back to list
    if (selectedKB && selectedKB.id === kb.id) {
      setSelectedKB(null);
      setIsEditing(false);
    }
    toast({
      title: "Knowledge Base Deleted",
      description: `"${kb.title}" has been permanently deleted.`,
      variant: "destructive"
    });
  };
  const handleBackToList = () => {
    setSelectedKB(null);
    setIsEditing(false);
  };

  // Knowledge Base Detail/Edit Component
  const KnowledgeBaseDetailEdit = ({
    kb
  }: {
    kb: any;
  }) => {
    const [files, setFiles] = useState(kb.files || []);
    const [urls, setUrls] = useState(kb.urls || []);
    const [texts, setTexts] = useState(kb.texts || []);
    const [newUrl, setNewUrl] = useState("");
    const [newTextTitle, setNewTextTitle] = useState("");
    const [newTextContent, setNewTextContent] = useState("");
    const form = useForm({
      defaultValues: {
        title: kb.title,
        description: kb.description
      }
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
          description: `${file.name} has been added to the knowledge base.`
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
          description: "The URL has been added to the knowledge base."
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
          description: "The text content has been added to the knowledge base."
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
    return <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <ArrowLeft size={16} className="mr-2" />
            Back to Knowledge Bases
          </Button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{kb.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{kb.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-lg font-medium text-gray-900">
                {isEditing ? "Settings" : "Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {isEditing ? <Form {...form}>
                  <FormField control={form.control} name="title" render={({
                field
              }) => <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  <FormField control={form.control} name="description" render={({
                field
              }) => <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  <Button className="w-full bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium">
                    Save Changes
                  </Button>
                </Form> : <>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <p className="text-sm text-gray-900 mt-1">{kb.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <p className="text-sm text-gray-900 mt-1">{kb.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Sources</label>
                    <p className="text-sm text-gray-900 mt-1">{kb.sources} sources</p>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <Button onClick={() => setIsEditing(true)} className="w-full bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium">
                      Edit Knowledge Base
                    </Button>
                    <Button variant="outline" onClick={() => handleConnectKB(kb)} className="w-full border-gray-200 hover:bg-gray-50">
                      Connect to Agent
                    </Button>
                  </div>
                </>}
            </CardContent>
          </Card>

          {/* Content Management */}
          <div className="lg:col-span-3">
            <Tabs value={detailActiveTab} onValueChange={setDetailActiveTab}>
              <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-white border border-gray-200 p-1 text-gray-600 shadow-sm w-auto">
                <TabsTrigger value="files" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50">
                  <FileText size={16} className="mr-2" />
                  Files ({files.length})
                </TabsTrigger>
                <TabsTrigger value="urls" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50">
                  <Globe size={16} className="mr-2" />
                  URLs ({urls.length})
                </TabsTrigger>
                <TabsTrigger value="texts" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50">
                  <MessageSquare size={16} className="mr-2" />
                  Text ({texts.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="files" className="mt-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {isEditing ? "File Management" : "Files"}
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? "Upload and manage document files" : "Document files in this knowledge base"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {isEditing && <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-[#FDDF5C] mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                          <input type="file" onChange={handleFileUpload} className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.txt" />
                        </div>}
                      
                      {files.length > 0 ? files.map((file: any, index: number) => <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                                <FileText size={16} className="text-[#FDDF5C]" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              
                              {isEditing && <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                                  <Trash2 size={14} className="text-red-500" />
                                </Button>}
                            </div>
                          </div>) : <p className="text-gray-500 text-sm text-center py-8">No files uploaded</p>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="urls" className="mt-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {isEditing ? "URL Management" : "URLs"}
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? "Add websites and web pages" : "Website URLs in this knowledge base"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {isEditing && <div className="flex gap-2">
                          <Input placeholder="Enter URL (e.g., https://example.com)" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                          <Button onClick={handleAddUrl} className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black">
                            <Plus size={16} className="mr-2" />
                            Add
                          </Button>
                        </div>}
                      
                      {urls.length > 0 ? urls.map((url: any, index: number) => <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
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
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <ExternalLink size={14} />
                              </Button>
                              {isEditing && <Button variant="ghost" size="sm" onClick={() => handleRemoveUrl(index)}>
                                  <Trash2 size={14} className="text-red-500" />
                                </Button>}
                            </div>
                          </div>) : <p className="text-gray-500 text-sm text-center py-8">No URLs added</p>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="texts" className="mt-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {isEditing ? "Text Content" : "Text Content"}
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? "Add custom text content" : "Custom text content in this knowledge base"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {isEditing && <div className="space-y-3">
                          <Input placeholder="Content title" value={newTextTitle} onChange={e => setNewTextTitle(e.target.value)} />
                          <Textarea placeholder="Enter your text content here..." value={newTextContent} onChange={e => setNewTextContent(e.target.value)} rows={4} />
                          <Button onClick={handleAddText} className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black">
                            <Plus size={16} className="mr-2" />
                            Add Text
                          </Button>
                        </div>}
                      
                      {texts.length > 0 ? texts.map((text: any, index: number) => <div key={index} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
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
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <ExternalLink size={14} />
                              </Button>
                              {isEditing && <Button variant="ghost" size="sm" onClick={() => handleRemoveText(index)}>
                                  <Trash2 size={14} className="text-red-500" />
                                </Button>}
                            </div>
                          </div>) : <p className="text-gray-500 text-sm text-center py-8">No text content added</p>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>;
  };
  if (selectedKB) {
    return <AppLayout>
        <KnowledgeBaseDetailEdit kb={selectedKB} />
      </AppLayout>;
  }
  return <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Knowledge Bases</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your AI knowledge sources and content</p>
          </div>
          <Button onClick={handleCreateKnowledgeBase} className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Knowledge Base
          </Button>
        </div>
        
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="text-lg font-medium text-gray-900">Knowledge Bases Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeBasesState.map(kb => <KnowledgeBaseCard key={kb.id} kb={kb} onView={() => handleViewKB(kb)} onEdit={() => handleEditKB(kb)} onConnect={() => handleConnectKB(kb)} onDuplicate={() => handleDuplicateKB(kb)} onDelete={() => handleDeleteKB(kb)} />)}
              <EmptyKnowledgeBaseCard onClick={handleCreateKnowledgeBase} />
            </div>
          </CardContent>
        </Card>
      </div>

      <ConnectAgentDialog kb={connectingKB} open={connectDialogOpen} onOpenChange={setConnectDialogOpen} />
    </AppLayout>;
};
interface KnowledgeBaseCardProps {
  kb: any;
  onView: () => void;
  onEdit: () => void;
  onConnect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}
const KnowledgeBaseCard = ({
  kb,
  onView,
  onEdit,
  onConnect,
  onDuplicate,
  onDelete
}: KnowledgeBaseCardProps) => {
  return <Card className="border border-gray-200 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
            <Database className="h-5 w-5 text-[#FDDF5C]" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
              {kb.sources} sources
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem onClick={onEdit} className="hover:bg-gray-50">Edit Knowledge Base</DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicate} className="hover:bg-gray-50">Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-red-600 hover:bg-red-50">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardTitle className="text-lg font-medium text-gray-900">{kb.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{kb.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" onClick={onView} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          View
        </Button>
        <Button variant="outline" size="sm" onClick={onConnect} className="border-gray-200 hover:bg-gray-50">
          Connect
        </Button>
      </CardFooter>
    </Card>;
};
const EmptyKnowledgeBaseCard = ({
  onClick
}: {
  onClick: () => void;
}) => <Card className="border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-[200px] hover:border-gray-300 transition-colors">
    <Button variant="ghost" className="flex flex-col h-full w-full gap-3 text-gray-500 hover:text-gray-700" onClick={onClick}>
      <div className="p-3 bg-gray-50 rounded-full">
        <Plus className="h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Add Knowledge Base</p>
        <p className="text-xs text-gray-400 mt-1">Create a new knowledge source</p>
      </div>
    </Button>
  </Card>;
interface SourceCardProps {
  title: string;
  icon: React.FC<{
    className?: string;
  }>;
  description: string;
  onClick: () => void;
}
const SourceCard = ({
  title,
  icon: Icon,
  description,
  onClick
}: SourceCardProps) => <Card className="border border-gray-200 hover:border-[#FDDF5C] hover:shadow-md cursor-pointer transition-all duration-200" onClick={onClick}>
    <CardHeader className="text-center">
      <div className="mx-auto p-3 bg-[#FDDF5C]/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-[#FDDF5C]" />
      </div>
      <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </CardContent>
  </Card>;
export default KnowledgeBases;
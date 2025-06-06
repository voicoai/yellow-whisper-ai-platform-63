import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Database, Globe, FileText, MessageSquare, ArrowLeft, ExternalLink, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { KnowledgeBaseEditor } from "@/components/knowledgebases/KnowledgeBaseEditor";
import { ConnectAgentDialog } from "@/components/knowledgebases/ConnectAgentDialog";

const KnowledgeBases = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("created");
  const [selectedKB, setSelectedKB] = useState<any>(null);
  const [editingKB, setEditingKB] = useState<any>(null);
  const [connectingKB, setConnectingKB] = useState<any>(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  
  // Mock data for knowledge bases with their contents
  const knowledgeBases = [
    {
      id: "kb-1",
      title: "Product Documentation",
      description: "Documentation for our SaaS product",
      type: "document" as const,
      sources: 3,
      files: [
        { name: "API_Documentation.pdf", type: "pdf", size: "2.4 MB", uploadDate: "2024-06-01" },
        { name: "User_Guide.docx", type: "docx", size: "1.8 MB", uploadDate: "2024-06-02" },
        { name: "FAQ.txt", type: "txt", size: "45 KB", uploadDate: "2024-06-03" }
      ],
      urls: [],
      texts: []
    },
    {
      id: "kb-2",
      title: "FAQ Database",
      description: "Frequently asked questions and answers",
      type: "text" as const,
      sources: 12,
      files: [],
      urls: [],
      texts: [
        { title: "General FAQ", content: "What is our product?", createdDate: "2024-05-15" },
        { title: "Billing FAQ", content: "How does billing work?", createdDate: "2024-05-16" },
        { title: "Technical FAQ", content: "Technical support questions", createdDate: "2024-05-17" }
      ]
    },
    {
      id: "kb-3",
      title: "Company Website",
      description: "Content from company website and blog",
      type: "website" as const,
      sources: 8,
      files: [],
      urls: [
        { url: "https://company.com/about", title: "About Us", lastCrawled: "2024-06-05" },
        { url: "https://company.com/products", title: "Products", lastCrawled: "2024-06-05" },
        { url: "https://company.com/blog", title: "Blog", lastCrawled: "2024-06-04" }
      ],
      texts: []
    }
  ];
  
  const handleCreateKnowledgeBase = () => {
    toast({
      title: "Coming Soon",
      description: "Knowledge Base creation will be available soon.",
    });
  };

  const handleViewKB = (kb: any) => {
    setSelectedKB(kb);
  };

  const handleEditKB = (kb: any) => {
    setEditingKB(kb);
  };

  const handleConnectKB = (kb: any) => {
    setConnectingKB(kb);
    setConnectDialogOpen(true);
  };

  const handleBackToList = () => {
    setSelectedKB(null);
    setEditingKB(null);
  };

  if (editingKB) {
    return (
      <AppLayout>
        <KnowledgeBaseEditor kb={editingKB} onBack={handleBackToList} />
      </AppLayout>
    );
  }

  if (connectingKB) {
    return (
      <AppLayout>
        <ConnectAgentDialog kb={connectingKB} open={connectDialogOpen} onOpenChange={setConnectDialogOpen} />
      </AppLayout>
    );
  }

  if (selectedKB) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToList}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Knowledge Bases
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{selectedKB.title}</h1>
              <p className="text-sm text-gray-600 mt-1">{selectedKB.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Files Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <FileText size={20} className="text-[#FDDF5C]" />
                  Files ({selectedKB.files.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedKB.files.length > 0 ? (
                  <div className="space-y-3">
                    {selectedKB.files.map((file: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                            <FileText size={16} className="text-[#FDDF5C]" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size} • {file.uploadDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">No files uploaded</p>
                )}
              </CardContent>
            </Card>

            {/* URLs Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Globe size={20} className="text-[#FDDF5C]" />
                  URLs ({selectedKB.urls.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedKB.urls.length > 0 ? (
                  <div className="space-y-3">
                    {selectedKB.urls.map((url: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
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
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">No URLs added</p>
                )}
              </CardContent>
            </Card>

            {/* Text Content Section */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <MessageSquare size={20} className="text-[#FDDF5C]" />
                  Text Content ({selectedKB.texts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedKB.texts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedKB.texts.map((text: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                            <MessageSquare size={16} className="text-[#FDDF5C]" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{text.title}</p>
                            <p className="text-xs text-gray-500 line-clamp-2">{text.content}</p>
                            <p className="text-xs text-gray-400">Created: {text.createdDate}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">No text content added</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Knowledge Bases</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your AI knowledge sources and content</p>
          </div>
          <Button 
            onClick={handleCreateKnowledgeBase}
            className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Knowledge Base
          </Button>
        </div>
        
        <Tabs defaultValue="created" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100">
            <TabsTrigger value="created" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Created
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Create New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="created" className="py-4">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-lg font-medium text-gray-900">Knowledge Bases Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {knowledgeBases.map((kb) => (
                    <KnowledgeBaseCard
                      key={kb.id}
                      kb={kb}
                      onView={() => handleViewKB(kb)}
                      onEdit={() => handleEditKB(kb)}
                      onConnect={() => handleConnectKB(kb)}
                    />
                  ))}
                  <EmptyKnowledgeBaseCard onClick={handleCreateKnowledgeBase} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create" className="py-4 space-y-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-lg font-medium text-gray-900">Create a Knowledge Base</CardTitle>
                <CardDescription className="text-gray-600">Select a source type to create your knowledge base</CardDescription>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <SourceCard
                  title="Website"
                  icon={Globe}
                  description="Import content from a website URL"
                  onClick={handleCreateKnowledgeBase}
                />
                <SourceCard
                  title="Document"
                  icon={FileText}
                  description="Upload documents like PDF, DOCX, or TXT files"
                  onClick={handleCreateKnowledgeBase}
                />
                <SourceCard
                  title="Raw Text"
                  icon={MessageSquare}
                  description="Create a knowledge base from text input"
                  onClick={handleCreateKnowledgeBase}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConnectAgentDialog 
        kb={connectingKB}
        open={connectDialogOpen}
        onOpenChange={setConnectDialogOpen}
      />
    </AppLayout>
  );
};

interface KnowledgeBaseCardProps {
  kb: any;
  onView: () => void;
  onEdit: () => void;
  onConnect: () => void;
}

const KnowledgeBaseCard = ({ kb, onView, onEdit, onConnect }: KnowledgeBaseCardProps) => {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all duration-200">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem onClick={onEdit} className="hover:bg-gray-50">Edit Knowledge Base</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50">Configure</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50">Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 hover:bg-red-50">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardTitle className="text-lg font-medium text-gray-900">{kb.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{kb.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onView}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          View
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onConnect}
          className="border-gray-200 hover:bg-gray-50"
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmptyKnowledgeBaseCard = ({ onClick }: { onClick: () => void }) => (
  <Card className="border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-[200px] hover:border-gray-300 transition-colors">
    <Button 
      variant="ghost"
      className="flex flex-col h-full w-full gap-3 text-gray-500 hover:text-gray-700"
      onClick={onClick}
    >
      <div className="p-3 bg-gray-50 rounded-full">
        <Plus className="h-6 w-6" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">Add Knowledge Base</p>
        <p className="text-xs text-gray-400 mt-1">Create a new knowledge source</p>
      </div>
    </Button>
  </Card>
);

interface SourceCardProps {
  title: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  onClick: () => void;
}

const SourceCard = ({ title, icon: Icon, description, onClick }: SourceCardProps) => (
  <Card className="border border-gray-200 hover:border-[#FDDF5C] hover:shadow-md cursor-pointer transition-all duration-200" onClick={onClick}>
    <CardHeader className="text-center">
      <div className="mx-auto p-3 bg-[#FDDF5C]/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-[#FDDF5C]" />
      </div>
      <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </CardContent>
  </Card>
);

export default KnowledgeBases;

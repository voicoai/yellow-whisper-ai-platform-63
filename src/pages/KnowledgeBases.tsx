
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Globe, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KnowledgeBases = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("created");
  
  const handleCreateKnowledgeBase = () => {
    toast({
      title: "Coming Soon",
      description: "Knowledge Base creation will be available soon.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Knowledge Bases</h1>
          <Button 
            onClick={handleCreateKnowledgeBase}
            className="bg-voico-blue-800 hover:bg-voico-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Knowledge Base
          </Button>
        </div>
        
        <Tabs defaultValue="created" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="created" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example knowledge base cards */}
              <KnowledgeBaseCard
                title="Product Documentation"
                description="Documentation for our SaaS product"
                type="document"
                sources={3}
              />
              <KnowledgeBaseCard
                title="FAQ Database"
                description="Frequently asked questions and answers"
                type="text"
                sources={12}
              />
              <EmptyKnowledgeBaseCard />
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="py-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create a Knowledge Base</CardTitle>
                <CardDescription>Select a source type to create your knowledge base</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </AppLayout>
  );
};

interface KnowledgeBaseCardProps {
  title: string;
  description: string;
  type: "website" | "document" | "text";
  sources: number;
}

const KnowledgeBaseCard = ({ title, description, type, sources }: KnowledgeBaseCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "website":
        return <Globe className="h-4 w-4 text-voico-blue-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-voico-yellow-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-voico-blue-300" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-muted p-2 rounded-md">
            {getIcon()}
          </div>
          <div className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
            {sources} sources
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button variant="outline" size="sm">
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmptyKnowledgeBaseCard = () => (
  <Card className="border-dashed flex flex-col items-center justify-center h-[172px]">
    <Button 
      variant="ghost"
      className="flex flex-col h-full w-full gap-2"
      onClick={() => {}}
    >
      <Plus className="h-6 w-6 opacity-50" />
      <p className="text-sm font-medium">Add Knowledge Base</p>
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
  <Card className="hover:border-primary cursor-pointer transition-all" onClick={onClick}>
    <CardHeader>
      <div className="bg-muted p-2 w-10 h-10 rounded-md flex items-center justify-center mb-2">
        <Icon className="h-5 w-5" />
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default KnowledgeBases;

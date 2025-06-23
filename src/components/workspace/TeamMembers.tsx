import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, SearchIcon, UserPlus, Settings, MoreHorizontal, Users, Shield, Eye, CheckCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Agent";
  status: "Active" | "Invited";
  dateAdded: string;
}

export function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "user-1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Admin",
      status: "Active",
      dateAdded: "May 1, 2025"
    },
    {
      id: "user-2",
      name: "Sarah Mitchell",
      email: "sarah@example.com",
      role: "Manager",
      status: "Active",
      dateAdded: "May 2, 2025"
    },
    {
      id: "user-3",
      name: "David Wilson",
      email: "david@example.com",
      role: "Agent",
      status: "Active",
      dateAdded: "May 3, 2025"
    },
    {
      id: "user-4",
      name: "Emma Brown",
      email: "emma@example.com",
      role: "Agent",
      status: "Invited",
      dateAdded: "May 5, 2025"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "agent",
    message: ""
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: ""
  });

  // Filter members based on search and role filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleInviteMember = () => {
    if (!inviteForm.email) {
      toast.error("Please enter an email address");
      return;
    }

    // Check if email already exists
    const existingMember = members.find(m => m.email.toLowerCase() === inviteForm.email.toLowerCase());
    if (existingMember) {
      toast.error("A member with this email already exists");
      return;
    }

    // Create new member
    const newMember: TeamMember = {
      id: `user-${Date.now()}`,
      name: inviteForm.email.split('@')[0], // Use email prefix as temporary name
      email: inviteForm.email,
      role: inviteForm.role.charAt(0).toUpperCase() + inviteForm.role.slice(1) as "Admin" | "Manager" | "Agent",
      status: "Invited",
      dateAdded: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };

    setMembers(prev => [...prev, newMember]);
    setInviteDialogOpen(false);
    setInviteForm({ email: "", role: "agent", message: "" });
    toast.success(`Invitation sent to ${inviteForm.email}`);
  };

  const handleRemoveMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    setMembers(prev => prev.filter(m => m.id !== memberId));
    toast.success(`${member.name} has been removed from the team`);
  };

  const handleChangeRole = (memberId: string, newRole: "Admin" | "Manager" | "Agent") => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    setMembers(prev => prev.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ));
    toast.success(`${member.name}'s role has been changed to ${newRole}`);
  };

  const handleEditProfile = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;
    
    setEditingMember(member);
    setEditForm({
      name: member.name,
      email: member.email
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingMember) return;
    
    if (!editForm.name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    
    if (!editForm.email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    // Check if email already exists (excluding current member)
    const existingMember = members.find(m => 
      m.email.toLowerCase() === editForm.email.toLowerCase() && m.id !== editingMember.id
    );
    if (existingMember) {
      toast.error("A member with this email already exists");
      return;
    }

    setMembers(prev => prev.map(m => 
      m.id === editingMember.id 
        ? { ...m, name: editForm.name.trim(), email: editForm.email.trim() }
        : m
    ));
    
    setEditDialogOpen(false);
    setEditingMember(null);
    setEditForm({ name: "", email: "" });
    toast.success("Member profile updated successfully");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Manage your workspace members and their permissions to collaborate effectively on your AI voice assistant platform.
            </p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{members.filter(m => m.status === 'Active').length} Active Members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>{members.filter(m => m.status === 'Invited').length} Pending Invitations</span>
              </div>
            </div>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl">Invite Team Member</DialogTitle>
                <DialogDescription className="text-base">
                  Send an invitation to join your VOICO workspace.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="colleague@example.com" 
                    className="h-11"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                  <Select 
                    value={inviteForm.role} 
                    onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">Personal Message (Optional)</Label>
                  <Input 
                    id="message" 
                    placeholder="Join our AI voice assistant platform!" 
                    className="h-11"
                    value={inviteForm.message}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter className="gap-3">
                <Button 
                  variant="outline" 
                  className="h-11"
                  onClick={() => setInviteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 h-11"
                  onClick={handleInviteMember}
                >
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Team Members Table */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="pb-6 bg-gray-50/50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Workspace Members</span>
            </CardTitle>
            <div className="flex space-x-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search members..." 
                  className="pl-10 w-64 h-10 bg-white border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px] h-10 bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/30 border-b">
                <TableHead className="font-semibold text-gray-700 py-4">Member</TableHead>
                <TableHead className="font-semibold text-gray-700">Role</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Date Added</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`font-medium ${
                        member.role === "Admin"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : member.role === "Manager"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {member.role === "Admin" && <Shield className="w-3 h-3 mr-1" />}
                      {member.role === "Manager" && <Eye className="w-3 h-3 mr-1" />}
                      {member.role === "Agent" && <Users className="w-3 h-3 mr-1" />}
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "Active" ? "default" : "outline"}
                      className={`font-medium ${
                        member.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      {member.status === "Active" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{member.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg border z-50">
                        <DropdownMenuItem 
                          className="text-sm cursor-pointer"
                          onClick={() => handleEditProfile(member.id)}
                        >
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm" asChild>
                          <Select onValueChange={(value) => handleChangeRole(member.id, value as "Admin" | "Manager" | "Agent")}>
                            <SelectTrigger className="w-full h-auto p-0 border-0 bg-transparent">
                              <SelectValue placeholder="Change Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white shadow-lg border z-50">
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Agent">Agent</SelectItem>
                            </SelectContent>
                          </Select>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 text-sm cursor-pointer"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="px-6 py-4 bg-gray-50/30 border-t text-center text-sm text-gray-500">
            Showing {filteredMembers.length} members of {members.length} total
          </div>
        </CardContent>
      </Card>
      
      {/* Roles and Permissions */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="pb-6 bg-gray-50/50 rounded-t-lg">
          <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Roles and Permissions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Admin Role */}
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-4 w-4 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Admin</h3>
                </div>
                <Badge className="bg-red-100 text-red-700 border-red-200">Full Access</Badge>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>Manage team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>Create/edit all agents</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>Manage phone numbers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>API and webhook access</span>
                </li>
              </ul>
            </div>
            
            {/* Manager Role */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Manager</h3>
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Limited Access</Badge>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>View team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>Create/edit assigned agents</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>View all call data</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <div className="w-4 h-4 mr-3 rounded-full border-2 border-gray-300"></div>
                  <span>No billing or API access</span>
                </li>
              </ul>
            </div>
            
            {/* Agent Role */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Agent</h3>
                </div>
                <Badge className="bg-gray-100 text-gray-700 border-gray-200">Basic Access</Badge>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>View assigned agents</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-4 w-4" />
                  <span>View assigned call data</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <div className="w-4 h-4 mr-3 rounded-full border-2 border-gray-300"></div>
                  <span>No editing capabilities</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <div className="w-4 h-4 mr-3 rounded-full border-2 border-gray-300"></div>
                  <span>No settings or billing</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Profile</DialogTitle>
            <DialogDescription className="text-base">
              Update member information for {editingMember?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">Full Name</Label>
              <Input 
                id="edit-name" 
                placeholder="Enter full name" 
                className="h-11"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-sm font-medium">Email Address</Label>
              <Input 
                id="edit-email" 
                type="email"
                placeholder="Enter email address" 
                className="h-11"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button 
              variant="outline" 
              className="h-11"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 h-11"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

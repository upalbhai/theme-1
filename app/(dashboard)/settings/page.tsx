"use client";

import React from "react";
import { Save, Building, Users, CreditCard, Bell, Shield, Paintbrush } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage your workspace and team preferences.</p>
        </div>
      </div>

      <Tabs defaultValue="workspace" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="workspace" className="gap-2 px-4"><Building className="h-4 w-4" /> Workspace</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2 px-4"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 px-4"><Paintbrush className="h-4 w-4" /> Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Workspace General</CardTitle>
              <CardDescription>Update your company details and core workspace settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Apex Enterprise" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label>Workspace URL</Label>
                  <div className="flex shadow-sm rounded-md">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground text-sm">https://</span>
                    <Input defaultValue="apex.crm.io" className="rounded-l-none bg-muted/30" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <Label>Support Email</Label>
                <Input defaultValue="support@apex.com" className="bg-muted/30" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 bg-muted/5">
              <Button className="gap-2 shadow-md shadow-primary/20"><Save className="h-4 w-4" /> Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>You are currently on the Enterprise plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
                <div>
                  <h3 className="font-bold text-primary text-xl flex items-center gap-2">
                    <CreditCard className="h-5 w-5" /> Enterprise Plan
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Unlimited seats, premium support, advanced analytics.</p>
                </div>
                <div className="sm:text-right">
                  <div className="text-3xl font-extrabold text-foreground tracking-tight">$499<span className="text-sm text-muted-foreground font-medium">/mo</span></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 justify-between bg-muted/5">
              <Button variant="outline" className="bg-background">Manage Billing</Button>
              <Button className="shadow-md shadow-primary/20">Upgrade Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
           <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border p-4 bg-card hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-base font-semibold">Compact Mode</Label>
                  <p className="text-xs text-muted-foreground">Reduces padding and typography to show more data on screen.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between rounded-xl border p-4 bg-card hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-base font-semibold">Animations & Transitions</Label>
                  <p className="text-xs text-muted-foreground">Enable rich UI animations and micro-interactions across the dashboard.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

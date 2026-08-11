"use client";

import React from "react";
import { Search, Send, Phone, Video, Info, Paperclip, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const DUMMY_CHATS = [
  { id: 1, name: "Sarah Jenkins", role: "VP Sales", lastMessage: "Can you send over the updated pitch deck?", time: "2m ago", unread: 2, initials: "SJ", color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Marketing Team", role: "Group", lastMessage: "Campaign goes live tomorrow!", time: "1h ago", unread: 0, initials: "MT", color: "from-purple-500 to-pink-500" },
  { id: 3, name: "David Chen", role: "Engineering", lastMessage: "The API integration is complete.", time: "Yesterday", unread: 0, initials: "DC", color: "from-emerald-500 to-teal-500" },
];

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-theme(spacing.16))] p-4 md:p-6 max-w-7xl mx-auto w-full">
      <Card className="flex-1 flex overflow-hidden border-border/50 shadow-sm rounded-xl">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col bg-muted/10">
          <div className="p-4 border-b bg-card">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9 bg-muted/50 border-transparent focus:bg-background" />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {DUMMY_CHATS.map((chat, idx) => (
              <div key={chat.id} className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${idx === 0 ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-muted/50 border-l-4 border-l-transparent'}`}>
                <Avatar className="h-11 w-11 shadow-sm">
                  <AvatarFallback className={`bg-gradient-to-br ${chat.color} text-white font-medium text-sm`}>{chat.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={`text-sm truncate ${idx === 0 ? 'font-bold' : 'font-medium'}`}>{chat.name}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate ${idx === 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="h-5 w-5 rounded-full bg-primary shadow-sm text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="hidden md:flex flex-col flex-1 bg-card">
          {/* Header */}
          <div className="h-[72px] border-b flex items-center justify-between px-6 bg-muted/5">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-medium">SJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-bold">Sarah Jenkins</h3>
                <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary"><Video className="h-4 w-4" /></Button>
              <div className="w-px h-5 bg-border mx-1" />
              <Button variant="ghost" size="icon" className="h-9 w-9"><Info className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-auto p-6 space-y-6 bg-muted/10">
             <div className="flex justify-center">
               <span className="text-[10px] font-medium text-muted-foreground bg-card shadow-sm border px-3 py-1 rounded-full uppercase tracking-wider">Today, Sept 14</span>
             </div>
             
             <div className="flex gap-3 max-w-[85%]">
                <Avatar className="h-8 w-8 mt-auto hidden sm:block shrink-0 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs">SJ</AvatarFallback>
                </Avatar>
                <div className="bg-card border shadow-sm p-3.5 rounded-2xl rounded-bl-sm">
                  <p className="text-sm leading-relaxed">Hey, are we still on for the 3PM sync with the design team?</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">10:42 AM</p>
                </div>
             </div>
             
             <div className="flex gap-3 max-w-[85%] ml-auto justify-end">
                <div className="bg-primary text-primary-foreground p-3.5 rounded-2xl rounded-br-sm shadow-md shadow-primary/20">
                  <p className="text-sm leading-relaxed">Yes! I've prepared the new dashboard mockups. I think they're going to love it.</p>
                  <p className="text-[10px] text-primary-foreground/70 mt-1.5 text-right">10:45 AM</p>
                </div>
             </div>
             
             <div className="flex gap-3 max-w-[85%]">
                <Avatar className="h-8 w-8 mt-auto hidden sm:block shrink-0 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs">SJ</AvatarFallback>
                </Avatar>
                <div className="bg-card border shadow-sm p-3.5 rounded-2xl rounded-bl-sm">
                  <p className="text-sm leading-relaxed">Awesome. Can you send over the updated pitch deck before we start?</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">10:46 AM</p>
                </div>
             </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-card">
            <div className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-xl border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary focus-within:bg-background transition-all">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary shrink-0 h-8 w-8"><Paperclip className="h-4 w-4" /></Button>
              <input 
                className="flex-1 bg-transparent border-0 focus:outline-none text-sm px-2 placeholder:text-muted-foreground/60" 
                placeholder="Type your message..."
              />
              <Button size="icon" className="h-9 w-9 rounded-lg shrink-0 shadow-sm shadow-primary/20"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

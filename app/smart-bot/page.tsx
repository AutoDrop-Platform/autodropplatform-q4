"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, Send, Mic, Phone, Mail, Settings, Zap, Globe, ShoppingCart, BarChart3 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: string
  }>
}

const botCapabilities = [
  {
    icon: ShoppingCart,
    title: "Product Management",
    description: "Import products from AliExpress, manage inventory, and optimize listings",
  },
  {
    icon: Mail,
    title: "Customer Service",
    description: "Handle customer inquiries via email, SMS, and voice automatically",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Generate sales reports, track performance, and provide insights",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Communicate in Arabic, English, and other languages",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automate order processing, payments, and shipping notifications",
  },
  {
    icon: Settings,
    title: "Platform Control",
    description: "Manage platform operations and fix issues automatically",
  },
]

const quickActions = [
  "Import products from AliExpress",
  "Check today's sales",
  "Generate monthly report",
  "Update product prices",
  "Send customer notifications",
  "Optimize product listings",
]

export default function SmartBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your Smart Auto Bot. I can help you manage your AutoDrop Platform store, import products, handle customer service, and much more. What would you like me to help you with today?",
      timestamp: new Date(),
      actions: [
        { label: "Import Products", action: "import_products" },
        { label: "Check Sales", action: "check_sales" },
        { label: "Customer Support", action: "customer_support" },
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("import") || input.includes("product")) {
      return "I can help you import products from AliExpress! I'll analyze trending products, optimize titles and descriptions, and set competitive prices. Would you like me to start importing products from a specific category?"
    } else if (input.includes("sales") || input.includes("revenue")) {
      return "Let me check your sales data... Based on your current performance, you've made $2,450 this month with 47 orders. Your top-selling product is 'Wireless Bluetooth Headphones' with 12 sales. Would you like a detailed breakdown?"
    } else if (input.includes("customer") || input.includes("support")) {
      return "I'm currently handling 3 customer inquiries. I've resolved 2 shipping questions and 1 product inquiry automatically. All customers received responses within 5 minutes. Is there a specific customer issue you'd like me to address?"
    } else if (input.includes("hello") || input.includes("hi")) {
      return "Hello! I'm here to help you grow your AutoDrop Platform business. I can import products, handle customers, generate reports, and much more. What would you like to accomplish today?"
    } else {
      return (
        "I understand you're asking about: " +
        userInput +
        ". I can help you with product management, customer service, sales analytics, and platform operations. Could you be more specific about what you'd like me to do?"
      )
    }
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Auto Bot</h1>
          <p className="text-xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Your AI-powered assistant that handles everything from product imports to customer service, available 24/7
            in multiple languages
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-500 hover:bg-green-600">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Online
            </Badge>
            <Badge className="bg-blue-500 hover:bg-blue-600">Arabic & English Support</Badge>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bot Capabilities */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Bot Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {botCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <capability.icon className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{capability.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{capability.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3 bg-transparent"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Contact Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                  <Phone className="h-4 w-4 text-green-600" />
                  <div className="text-sm">
                    <div className="font-medium">Voice Control</div>
                    <div className="text-gray-600">+1 (840) 219-0170</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div className="text-sm">
                    <div className="font-medium">Email Support</div>
                    <div className="text-gray-600">autodrop.platform@gmail.com</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=Bot" />
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Smart Auto Bot</CardTitle>
                      <div className="text-sm text-gray-600">Always ready to help</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        {message.actions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.actions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs bg-white text-gray-700 hover:bg-gray-50"
                                onClick={() => handleQuickAction(action.label)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                        <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your store..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Press Enter to send • The bot responds in Arabic and English
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

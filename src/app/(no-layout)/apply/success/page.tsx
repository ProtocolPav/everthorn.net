"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Home, MessageSquare, Play, Shield, Globe, ExternalLink, Clock, Users, Sparkles, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function ApplicationSuccessPage() {
    const router = useRouter()
    const { data: session } = useSession()

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-primary/5 to-background pt-16 pb-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center space-y-6">
                        {/* Success Animation */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute inset-0 w-24 h-24 bg-green-500/20 rounded-full mx-auto animate-ping"></div>
                        </div>

                        {/* Welcome Message */}
                        <div className="space-y-3">
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Thanks for applying, {session?.user?.name || 'there'}! 🎉
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Your application has been successfully submitted. We'll review it thoroughly!
                            </p>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center justify-center gap-3 pt-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <img
                                    src={session?.user?.image || ""}
                                    className="w-10 h-10 rounded-full"
                                    alt="Your Avatar"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">@{session?.user?.name || 'Unknown'}</p>
                                <p className="text-sm text-muted-foreground">Application submitted successfully</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Next Steps */}
                    <div className="space-y-6">
                        <Card className="border-2 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                    What happens next?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                                        <div>
                                            <h3 className="font-semibold">Application Review</h3>
                                            <p className="text-sm text-muted-foreground">Our team will carefully review your application</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="w-3 h-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">24-48 hours</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                                        <div>
                                            <h3 className="font-semibold">Friendly Interview</h3>
                                            <p className="text-sm text-muted-foreground">Quick casual chat on Discord to get to know you</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Users className="w-3 h-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">Usually within a week</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                                        <div>
                                            <h3 className="font-semibold">Welcome to Everthorn!</h3>
                                            <p className="text-sm text-muted-foreground">Join our community and start your adventure</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Sparkles className="w-3 h-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">After successful interview</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm text-center">
                                        <strong>📱 Keep an eye on your Discord DMs!</strong><br />
                                        We'll reach out soon to schedule your interview. Don't worry - it's just a friendly chat!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enhanced Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4">While you wait...</h3>

                            {/* Community Guidelines Button */}
                            <div
                                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-[1px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                onClick={() => router.push('/guidelines')}
                            >
                                <div className="bg-card rounded-xl p-5 h-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg">Community Guidelines</h4>
                                                <p className="text-sm text-muted-foreground">Read our server rules & guidelines</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <span className="text-sm font-medium">Read</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Everthorn Website Button */}
                            <div
                                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-[1px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                onClick={() => router.push('/home')}
                            >
                                <div className="bg-card rounded-xl p-5 h-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <Globe className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg">Everthorn Website</h4>
                                                <p className="text-sm text-muted-foreground">Explore our main website</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <span className="text-sm font-medium">Visit</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - YouTube Embed */}
                    <div className="space-y-6">
                        <Card className="overflow-hidden border-2 border-red-500/20">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-3">
                                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white" />
                                    </div>
                                    Latest from our YouTube
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Check out our newest content while you wait!
                                </p>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="relative group cursor-pointer">
                                    {/* YouTube Embed */}
                                    <div className="aspect-video bg-muted">
                                        <iframe
                                            src="https://www.youtube.com/embed/Zp19IhdHXno"
                                            title="Latest Everthorn Video"
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-4 pb-0 bg-card">
                                        <h4 className="font-semibold mb-2">Everthorn: Our World</h4>
                                        <p className="text-sm text-muted-foreground">
                                            For 6 years we've been creating worlds. This one is our biggest and longest one yet. Join us in celebrating Everthorn, our community, and our world.
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                            <span>Published June 14 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/50 py-8 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Application submitted successfully on {new Date().toLocaleDateString()} •
                        Built with 💝 by the Everthorn team
                    </p>
                </div>
            </div>
        </div>
    )
}

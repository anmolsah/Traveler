import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function TripSharing({ trip }) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [shareableLink, setShareableLink] = useState("");

    const generateShareableLink = () => {
        const currentUrl = window.location.href;
        setShareableLink(currentUrl);

        // Copy to clipboard
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success("Link copied to clipboard!");
        }).catch(() => {
            toast.error("Failed to copy link");
        });
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent(`Check out my trip to ${trip?.userSelection?.location?.label}`);
        const body = encodeURIComponent(`Hi! I wanted to share my travel itinerary with you. Check it out here: ${window.location.href}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    const shareViaWhatsApp = () => {
        const text = encodeURIComponent(`Check out my trip to ${trip?.userSelection?.location?.label}: ${window.location.href}`);
        window.open(`https://wa.me/?text=${text}`);
    };

    const shareViaTwitter = () => {
        const text = encodeURIComponent(`Planning an amazing trip to ${trip?.userSelection?.location?.label}! 🌍✈️`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
    };

    const generatePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            // Dynamic import to reduce bundle size
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).jsPDF;

            // Hide sharing section temporarily
            const sharingElement = document.querySelector('[data-sharing-section]');
            if (sharingElement) {
                sharingElement.style.display = 'none';
            }

            // Capture the trip content
            const element = document.querySelector('[data-trip-content]') || document.body;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            });

            // Show sharing section again
            if (sharingElement) {
                sharingElement.style.display = 'block';
            }

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const fileName = `${trip?.userSelection?.location?.label || 'Trip'}_Itinerary.pdf`;
            pdf.save(fileName);

            toast.success("PDF generated successfully!");
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate PDF");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6" data-sharing-section>
            <h3 className="font-bold text-xl text-[#364F6B] mb-6 flex items-center gap-2">
                📤 Share Your Trip
            </h3>

            {/* Generate Shareable Link */}
            <div className="mb-6">
                <h4 className="font-semibold text-[#364F6B] mb-3">🔗 Shareable Link</h4>
                <div className="flex gap-2">
                    <Input
                        value={shareableLink}
                        placeholder="Click 'Generate Link' to create a shareable URL"
                        readOnly
                        className="flex-1"
                    />
                    <Button
                        onClick={generateShareableLink}
                        className="bg-[#3FC1C9] hover:bg-[#FC5185]"
                    >
                        Generate Link
                    </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Anyone with this link can view your trip itinerary
                </p>
            </div>

            {/* Social Sharing */}
            <div className="mb-6">
                <h4 className="font-semibold text-[#364F6B] mb-3">📱 Share on Social Media</h4>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={shareViaWhatsApp}
                        className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                    >
                        <span>📱</span>
                        WhatsApp
                    </Button>
                    <Button
                        onClick={shareViaTwitter}
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                    >
                        <span>🐦</span>
                        Twitter
                    </Button>
                    <Button
                        onClick={shareViaEmail}
                        className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
                    >
                        <span>📧</span>
                        Email
                    </Button>
                </div>
            </div>

            {/* Download Options */}
            <div className="mb-6">
                <h4 className="font-semibold text-[#364F6B] mb-3">💾 Download & Save</h4>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={generatePDF}
                        disabled={isGeneratingPDF}
                        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                        {isGeneratingPDF ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                Generating...
                            </>
                        ) : (
                            <>
                                <span>📄</span>
                                Download PDF
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={() => {
                            const tripData = JSON.stringify(trip, null, 2);
                            const blob = new Blob([tripData], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${trip?.userSelection?.location?.label || 'Trip'}_Data.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                            toast.success("Trip data downloaded!");
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                    >
                        <span>💾</span>
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Collaboration */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    👥 Collaborate with Travel Companions
                </h4>
                <p className="text-gray-700 text-sm mb-3">
                    Share your trip with friends and family so they can view your itinerary and stay updated on your plans.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Share the link with your travel companions</li>
                    <li>• Download PDF for offline access</li>
                    <li>• Export data to import into other travel apps</li>
                    <li>• Print the itinerary for backup</li>
                </ul>
            </div>
        </div>
    );
}

export default TripSharing;
import EmailTemplate from "@/components/email-templates/membership-confirmation";

export default function PreviewPage() {
  return (
    <div className="p-2 max-w-4xl mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
          Email Template Preview
        </h1>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <EmailTemplate userName="John Doe" secretCode="CST12345" />
        </div>

        {/* Mobile preview frame */}
        <div className="mt-8 mx-auto" style={{ maxWidth: "330px" }}>
          <h2 className="text-lg font-bold mb-2 text-center text-gray-800">
            330px Mobile Preview
          </h2>
          <div className="border-4 border-gray-800 rounded-3xl overflow-hidden p-2 bg-gray-800">
            <div
              className="rounded-xl overflow-hidden"
              style={{ width: "330px" }}
            >
              <EmailTemplate userName="John Doe" secretCode="CST12345" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

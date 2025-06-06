
import { AppLayout } from "@/components/layout/AppLayout";
import { NumbersManagement } from "@/components/telephony/NumbersManagement";

const Telephony = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium text-black">Phone Numbers</h1>
          <p className="text-gray-600 mt-1">Manage your phone numbers and telephony configuration</p>
        </div>
        <NumbersManagement />
      </div>
    </AppLayout>
  );
};

export default Telephony;


import { AppLayout } from "@/components/layout/AppLayout";
import { NumbersManagement } from "@/components/telephony/NumbersManagement";

const Telephony = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Phone Numbers</h1>
        <NumbersManagement />
      </div>
    </AppLayout>
  );
};

export default Telephony;

import DashboardSidebar from "@/compnonent/dashboard/DashboardSidebar";


const DashboardLayout = ({ children }) => {
  return (
    <section className="min-h-screen bg-orange-50/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">

        {/* Dashboard Sidebar */}
        <DashboardSidebar />

        {/* Dashboard Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>
    </section>
  );
};

export default DashboardLayout;


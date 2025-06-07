import { ListItemForm } from '@/components/forms/ListItemForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ListItemPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ListItemForm />
      </main>
      <Footer />
    </div>
  );
}

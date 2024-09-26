// pages/index.js
import Head from 'next/head';
import DatePicker from '../components/DatePicker';

export default function Home() {
    return (
        <div className="min-h-screen bg-yellow-300 flex items-center justify-center"> {/* Change bg-gray-100 to bg-gray-200 */}
            <Head>
                <title>Date Picker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h1 className="text-2xl bg-gray-300 font-bold text-center mb-4">Recurring Date Picker</h1>
                <DatePicker />
            </main>
        </div>
    );
}

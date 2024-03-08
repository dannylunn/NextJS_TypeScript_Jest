import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('./modal'), { ssr: false });

export default function Page() {
    return <Modal />;
}

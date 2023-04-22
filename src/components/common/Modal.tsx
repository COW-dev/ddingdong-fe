type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10">
      {children}
    </div>
  );
}

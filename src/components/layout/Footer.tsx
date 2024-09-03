import { Link } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-14 flex w-full justify-center bg-gray-50 md:mt-20">
      <div className="w-full max-w-6xl px-6 py-8 md:px-16 md:py-10">
        <a
          href="https://confusion-icebreaker-9cd.notion.site/ddingdong-fc1246aa999042ccb02e6d57d59d99f0?pvs=4"
          className="text-xs font-semibold text-gray-500 md:text-sm"
        >
          개인정보 처리방침
        </a>
        <div className="text-xs font-medium text-gray-500 md:text-sm">
          Copyright ⓒ ddingdong. All Rights Reserved
        </div>
        <div className="text-xs text-gray-400 md:text-sm">
          E-mail: mju.ddingdong@gmail.com
        </div>
      </div>
    </footer>
  );
}

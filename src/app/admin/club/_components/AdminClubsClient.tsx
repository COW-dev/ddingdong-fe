'use client';

import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Modal } from 'ddingdong-design-system';

import { clubQueryOptions } from '@/app/_api/queries/club';
import type { AdminClub } from '@/app/_api/types/club';
import CreateClub from '@/app/admin/club/_components/modal/CreateClub';
import Admin from '@/assets/admin.jpg';

import AdminClubCard from './AdminClubCard';
import AdminClubsHeader from './AdminClubHeader';
import ManageClub from './modal/ManageClub';

export default function AdminClubsClient() {
  const { data: clubs = [] } = useSuspenseQuery(clubQueryOptions.admin());

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModalWith = (node: React.ReactNode) => {
    setModalContent(node);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <AdminClubsHeader
        onClickCreate={() =>
          openModalWith(<CreateClub closeModal={closeModal} />)
        }
      />

      <div className="mt-12 grid w-full grid-cols-1 place-items-center gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {clubs
          .slice()
          .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
          .map((club: AdminClub) => (
            <AdminClubCard
              key={club.id}
              name={club.name}
              score={club.score}
              imageSrc={club?.profileImage.cdnUrl ?? Admin}
              onClick={() =>
                openModalWith(
                  <ManageClub
                    id={club.id}
                    score={club.score}
                    name={club.name}
                    closeModal={closeModal}
                    handleModal={({ content }) => openModalWith(content)}
                  />,
                )
              }
            />
          ))}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}

import { describe, it, expect } from "vitest";
import { render } from "@/test/utils";
import { ClubDetailView } from '@/app/admin/my-club/_pages/ClubDetailClientPage';
import { myClubMock } from "./my-clubMock";
import { screen } from "@testing-library/react";

describe('ClubDetailPage 테스트', () => {
    it('페이지 렌더링 시 동아리 정보를 표시한다.', () => {
        render(<ClubDetailView clubData={myClubMock} />);

        const texts = [
            '테스트 동아리',
            '김주장',
            '010-1234-5678',
            'S1234',
            '동아리 소개',
            '동아리 활동',
            '성실한 사람',
        ];

        texts.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
})
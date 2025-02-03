'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 페이지네이션 컨테이너의 Props 타입 정의
type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

// 개별 페이지 버튼의 Props 타입 정의
type ButtonProps = {
  page: number;
  activeClass: boolean;
};

import { Button } from '../ui/button';

function ComplexButtonContainer({ currentPage, totalPages }: ButtonContainerProps) {
  const searchParams = useSearchParams(); // 현재 URL의 검색 매개변수 가져오기
  const router = useRouter(); // 라우터 인스턴스 생성
  const pathname = usePathname(); // 현재 경로 가져오기 (쿼리 매개변수 제외)

  // 페이지 변경 처리 함수
  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '', // 기존 검색어 유지
      jobStatus: searchParams.get('jobStatus') || '', // 기존 jobStatus 필터 유지
      page: String(page), // 새로운 페이지 번호 설정
    };

    const params = new URLSearchParams(defaultParams);
    router.push(`${pathname}?${params.toString()}`); // 업데이트된 URL로 이동
  };

  // 개별 페이지 버튼 생성 함수
  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size='icon'
        variant={activeClass ? 'default' : 'outline'} // 활성화된 페이지 강조
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  // 페이지네이션 버튼 렌더링 함수
  const renderPageButtons = () => {
    const pageButtons = [];
    
    // 첫 번째 페이지 버튼 추가
    pageButtons.push(addPageButton({ page: 1, activeClass: currentPage === 1 }));
    
    // 현재 페이지가 3보다 크면 '...' 추가
    if (currentPage > 3) {
      pageButtons.push(
        <Button size='icon' variant='outline' key='dots-1'>
          ...
        </Button>
      );
    }

    // 현재 페이지 앞쪽 버튼 추가 (첫 번째와 두 번째 페이지가 아닌 경우)
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ page: currentPage - 1, activeClass: false }));
    }

    // 현재 페이지 버튼 추가 (첫 번째 및 마지막 페이지 제외)
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(addPageButton({ page: currentPage, activeClass: true }));
    }

    // 현재 페이지 뒤쪽 버튼 추가 (마지막 및 마지막에서 두 번째 페이지가 아닌 경우)
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(addPageButton({ page: currentPage + 1, activeClass: false }));
    }

    // 현재 페이지가 마지막에서 두 번째보다 작으면 '...' 추가
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size='icon' variant='outline' key='dots-2'>
          ...
        </Button>
      );
    }
    
    // 마지막 페이지 버튼 추가
    pageButtons.push(addPageButton({ page: totalPages, activeClass: currentPage === totalPages }));
    
    return pageButtons;
  };

  return (
    <div className='flex gap-x-2'>
      {/* 이전 페이지 버튼 */}
      <Button
        className='flex items-center gap-x-2'
        variant='outline'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages; // 첫 번째 페이지에서 이전을 누르면 마지막 페이지로 이동
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft />
        이전
      </Button>
      
      {/* 페이지 번호 버튼 */}
      {renderPageButtons()}
      
      {/* 다음 페이지 버튼 */}
      <Button
        className='flex items-center gap-x-2'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1; // 마지막 페이지에서 다음을 누르면 첫 번째 페이지로 이동
          handlePageChange(nextPage);
        }}
        variant='outline'
      >
        다음
        <ChevronRight />
      </Button>
    </div>
  );
}

export default ComplexButtonContainer;

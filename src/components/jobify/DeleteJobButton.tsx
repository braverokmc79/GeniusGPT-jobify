import { deleteJobAction } from '@/actions/jobService';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Button } from '../ui/button';

interface DeleteJobButtonProps {
  id: string;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ id }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: '에러가 발생 했습니다.', variant: 'destructive' });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });
      toast({ description: '직업을 삭제 했습니다.' });
    },
    onError: () => toast({ description: '에러가 발생 했습니다.', variant: 'destructive' }),
  });

  const handleDeleteClick = () => {
    toast({
      description: '정말 삭제하시겠습니까?',
      position:"top",
      action: (
        <Button
          variant="destructive"
          size="sm"          
          onClick={() => mutate()}
        >
          삭제
        </Button>
      ),
    });
  };

  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={handleDeleteClick}
      className="bg-red-500 hover:bg-red-600 text-white"
    >
      {isPending ? '직업 삭제중...' : '직업 삭제하기'}
    </Button>
  );
};

export default DeleteJobButton;

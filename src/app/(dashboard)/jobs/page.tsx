"use client"
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import React from 'react'

const JobsPage:React.FC = () => {
  const { toast } = useToast()
 
  return (   
      <h1 className='text-4xl'>
          JobsPage


          <Button
           variant="outline"
            onClick={() => {
              toast({
                variant: "default",
                //position: "top",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            }}
          >
            Show Toast
          </Button>
      </h1>
  )
}

export default JobsPage;
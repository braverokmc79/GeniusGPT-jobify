"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import {Input} from '@/components/ui/input';

const formSchema=z.object({
    username:z.string().min(2, {
        message: "사용자 아이디는 2자 이상이어야 합니다.",
    })
});


function CreateJobForm() {

   //1.폼 정의
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    }
  });

  //2.전송 핸들러
  function onSubmit(value:z.infer<typeof formSchema>) {        
        console.log("onSubmit   called  :",value);
  }




  return (
    <Form  {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자 아이디</FormLabel>
              <FormControl>
                <Input placeholder="사용자 아이디" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">등록하기</Button>

      </form>
    </Form>
  );
}
export default CreateJobForm;

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { BadgeCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";

export default function AddBookForm({
  addBookToLibrary,
  myLibrary,
  setMyLibrary,
  setDisplayForm,
}) {
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    author: z.string().min(2, {
      message: "author must be at least 2 characters.",
    }),
    pageCount: z
      .number()
      .positive({
        message: "page count must be present",
      })
      .refine((val) => val > 0, {
        message: "page count must be greater than 0",
      }),
    isRead: boolean(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      pageCount: "",
      isRead: false,
    },
  });

  function onSubmit(values) {
    console.log(values);
    addBookToLibrary(
      setMyLibrary,
      values.title,
      values.author,
      values.pageCount,
      values.isRead
    );
  }

  return (
    <div className=" mt-2 mb-8">
      <Card className="p-4">
        <Button type="button" onClick={() => setDisplayForm(false)}>
          close form
        </Button>
        <Form {...form}>
          {" "}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="m-8">
                  <FormLabel>book&apos;s name</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormDescription>enter the book&apos;s name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem className="m-8">
                  <FormLabel>book&apos;s author</FormLabel>
                  <FormControl>
                    <Input placeholder="author" {...field} />
                  </FormControl>
                  <FormDescription>
                    enter the book&apos;s author
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem className="m-8">
                  <FormLabel>book&apos;s number of pages</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="number of pages"
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    enter the book&apos;s number of pages
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isRead"
              render={({ field }) => (
                <FormItem className="m-8">
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>is the book read ?</FormLabel>
                    <FormControl>
                      <Toggle
                        pressed={field.value}
                        onPressedChange={(pressed) => field.onChange(pressed)}
                        className={clsx(
                          "transition-colors outline-2 border outline-transparent focus:outline",
                          field.value ? "" : "bg-primary text-secondary"
                        )}
                      >
                        {field.value ? (
                          <>
                            read <BadgeCheck className="text-green-500" />
                          </>
                        ) : (
                          "not read"
                        )}
                      </Toggle>
                    </FormControl>
                  </div>
                  <FormDescription>
                    toggle to make as read or unread
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="m-auto mb-4">
              add this book to library
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

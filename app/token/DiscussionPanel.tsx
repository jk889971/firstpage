"use client"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Comment = {
  id: string
  text: string
  createdAt: number
  replies: Comment[]
}

function countAllItems(list: Comment[]): number {
  let count = 0
  list.forEach((c) => {
    count += 1
    if (c.replies.length > 0) {
      count += countAllItems(c.replies)
    }
  })
  return count
}

interface DiscussionPanelProps {
  commentText: string
  setCommentText: React.Dispatch<React.SetStateAction<string>>
  comments: Comment[]
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  replyToId: string | null
  setReplyToId: (id: string | null) => void
  replyText: string
  setReplyText: (val: string) => void
  textareaRef: React.RefObject<HTMLTextAreaElement>
}

export default function DiscussionPanel({
  commentText,
  setCommentText,
  comments,
  setComments,
  replyToId,
  setReplyToId,
  replyText,
  setReplyText,
  textareaRef,
}: DiscussionPanelProps) {
  // Helper to insert a reply under a specific parent
  function appendToNestedReplies(
    root: Comment,
    targetId: string,
    newReply: Comment
  ): Comment {
    if (root.id === targetId) {
      return { ...root, replies: [...root.replies, newReply] }
    }
    if (root.replies.length === 0) return root
    return {
      ...root,
      replies: root.replies.map((child) =>
        appendToNestedReplies(child, targetId, newReply)
      ),
    }
  }

  function handlePostReply(parentId: string) {
    if (replyText.trim() === "") return
    const newReply: Comment = {
      id: Date.now().toString(),
      text: replyText.trim(),
      createdAt: Date.now(),
      replies: [],
    }
    const updated = comments.map((c) =>
      appendToNestedReplies(c, parentId, newReply)
    )
    setComments(updated)
    setReplyToId(null)
    setReplyText("")
  }

  // Count how many “items” (comments + nested replies) we have
  const totalItems = countAllItems(comments)

  return (
    <div>
      {/* ─── Descriptive paragraph above the comment field ─── */}
      <h2 className="text-[#c8cdd1] text-lg font-semibold max-[480px]:font-bold mb-2 max-[480px]:text-[clamp(1rem,3.5vw,1.5rem)]">
        Flappy Bird ($FBD)
      </h2>
      <p className="text-[#c8cdd1] text-sm leading-relaxed mb-4 text-[clamp(0.6rem,3vw,0.875rem)]">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ip
      </p>
      {/* ─── Input row + live character count ─── */}
      <div className="relative pt-2 w-full">
        <textarea
          ref={textareaRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={250}
          rows={1}
          className="
            theme-textarea
            w-full
            bg-[#0e1a38]
            border border-[#21325e]
            rounded-md
            px-3 py-2
            text-white
            placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#19c0f4]
            resize-none
            text-sm
            overflow-hidden
            scrollbar-thin scrollbar-thumb-[#19c0f4]/60 scrollbar-track-[#21325e]
            max-h-[4.5rem]
            leading-6
          "
          placeholder="Enter Comment"
        />
      </div>
      <span className="block text-left text-xs text-white/50 ml-1">
        {commentText.length}/250
      </span>

      {/* ─── “Post Comment” button ─── */}
      <div className="flex justify-end pb-4 w-full">
        <Button
          onClick={() => {
            if (commentText.trim() === "") return
            const newComment: Comment = {
              id: Date.now().toString(),
              text: commentText.trim(),
              createdAt: Date.now(),
              replies: [],
            }
            setComments((prev) => [...prev, newComment])
            setCommentText("")
            setReplyToId(null)
          }}
          size="sm"
          variant="outline"
          className="
            bg-transparent border-[#19c0f4] text-[#19c0f4]
            hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4]
            font-normal rounded-md px-4 py-2 text-sm
          "
        >
          Comment
        </Button>
      </div>

      {/* ─── Comment list (recursively render) ─── */}
      <div
        className={
          totalItems >= 4
            ? "theme-textarea overflow-y-auto overflow-x-hidden space-y-4 px-2 scrollbar-thin scrollbar-thumb-[#19c0f4]/60 scrollbar-track-[#21325e] max-h-[36rem]"
            : "space-y-4 px-2 overflow-x-hidden"
        }
      >
        {comments.length === 0 ? (
          <p className="text-[#c8cdd1] text-sm text-center">
            No comments yet.
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="space-y-2">
              {/* ─── Single comment row ─── */}
              <div className="flex gap-3 w-full">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-[#565656]">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 pr-4">
                  <div className="flex flex-col gap-1 lg:flex-row lg:items-center justify-between">
                    <span className="text-white font-semibold text-sm">
                      Anonymous
                    </span>
                    <span className="text-[#c8cdd1] text-xs text-[clamp(0.5rem,2vw,0.75rem)]">
                      {new Date(c.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[#c8cdd1] text-sm mt-1 break-all text-[clamp(0.65rem,2.5vw,1rem)]">
                    {c.text}
                  </p>
                  <button
                    onClick={() => {
                      setReplyToId(c.id)
                      setReplyText("")
                    }}
                    className="mt-1 text-[#19c0f4] text-xs hover:text-white"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {/* ─── Reply textarea if replying to this comment ─── */}
              {replyToId === c.id && (
                <div className="ml-10 mt-2 pr-4 pt-1 pl-1 max-w-full overflow-x-hidden">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={1}
                    maxLength={250}
                    className="
                      theme-textarea
                      w-full
                      max-w-full
                      bg-[#0e1a38]
                      border border-[#21325e]
                      rounded-md
                      px-3 py-2
                      text-white
                      placeholder:text-gray-400
                      focus:outline-none focus:ring-2 focus:ring-[#19c0f4]
                      resize-none
                      text-sm
                      overflow-y-auto
                      scrollbar-thin scrollbar-thumb-[#19c0f4]/60 scrollbar-track-[#21325e]
                      max-h-[4.5rem]
                      leading-6
                    "
                    placeholder="Reply…"
                  />
                  <span className="block text-left text-xs text-white/50">
                    {replyText.length}/250
                  </span>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handlePostReply(c.id)}
                      size="sm"
                      variant="outline"
                      className="
                        text-[#19c0f4] bg-transparent border-[#19c0f4]
                        hover:bg-[#19c0f4] hover:text-white hover:border-[#19c0f4]
                        rounded-md px-3 py-1 text-xs mb-4
                      "
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* ─── Nested replies (if any) ─── */}
              {c.replies.length > 0 && (
                <div className="ml-10 space-y-4 mt-4 w-full">
                  {c.replies.map((r) => (
                    <div key={r.id} className="flex gap-3 w-full">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-[#565656]">U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 pr-16">
                        <div className="flex flex-col gap-1 lg:flex-row lg:items-center justify-between">
                          <span className="text-white font-semibold text-sm text-[clamp(0.65rem,2.5vw,1rem)]">
                            Anonymous
                          </span>
                          <span className="text-[#c8cdd1] text-xs text-[clamp(0.5rem,2vw,0.75rem)]">
                            {new Date(r.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-[#c8cdd1] text-sm mt-1 break-all text-[clamp(0.5rem,2vw,0.75rem)]">
                          {r.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
import { Card } from "@/components/ui"
import ChatSidebar from "./components/ChatSidebar"
import ChatBody from "./components/ChatBody"
import ContactInfoDrawer from "./components/ContactInfoDrawer"

const Inbox = () => {
	return (
		<>
			<Card className="h-full border-0" bodyClass="h-full flex flex-col">
				<div className="flex flex-auto h-full gap-8">
					<ChatSidebar />
					<ChatBody />
				</div>
			</Card>
			<ContactInfoDrawer />
		</>
	)
}

export default Inbox

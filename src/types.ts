export interface IContract {
	id: string; 
	title: string;
	client: string;
	startDate: string;
	endDate: string;
	status: "Active" | "Pending" | "Closed";
}

export type App = {
	id: string;
	name: string;
	code: string;
	createdAt: Date;
	updatedAt: Date;
};

export type AppList = App[];

export type AppApiResponse = Omit<App, "createdAt" | "updatedAt"> & {
	created_at: Date;
	updated_at: Date;
};

export type AppListApiResponse = AppApiResponse[];


interface AlertOptions {
	autoClose?: number;
}

export const useAppAlert = () => {
	const errorMsg = (error: any, options?: AlertOptions): void => {
		let errorText = "";

		if (typeof error === "string") {
			errorText = error;
		} else if (error?.response?.data?.message) {
			errorText = error.response.data.message;
		} else if (error?.data?.message) {
			errorText = error.data.message;
		} else if (error?.value?.data?.message) {
			errorText = error.value.data.message;
		} else if (error?.value?.message?.data?.message) {
			errorText = error.value.message.data.message;
		} else {
			errorText = error?.message || JSON.stringify(error);
		}

		const toast = useToast();
		toast.add({
			title: "Error",
			description: errorText,
			color: "error",
			duration: options?.autoClose ?? 0, // Default to infinite for errors
			icon: "lucide:circle-x"
		});
	};

	const successMsg = (message: any, text = "", options?: AlertOptions): void => {
		const toast = useToast();
		toast.add({
			title: message,
			description: text,
			color: "success",
			duration: options?.autoClose ?? 5000, // Default 5 seconds for success toasts
			icon: "lucide:circle-check"
		});
	};

	const successMsgWithConfirm = (message: any, text = "", options?: AlertOptions): void => {
		const toast = useToast();
		toast.add({
			title: message,
			description: text,
			color: "success",
			duration: options?.autoClose ?? 0, // Default to infinite when confirmation is needed
			icon: "lucide:circle-check"
		});

	};

	const warningMsg = (message: any, options?: AlertOptions): void => {
		const toast = useToast();
		toast.add({
			title: message,
			color: "warning",
			duration: options?.autoClose ?? 0, // Default to infinite for warnings
			icon: "lucide:triangle-alert"
		});

	};

	const confirmItem = async (message: any, html: any = ""): Promise<boolean> => {
		// TODO IMPLEMENT MODAL OVERLAY
		return new Promise((resolve) => { });
	};

	return {
		errorMsg,
		successMsg,
		successMsgWithConfirm,
		warningMsg,
		confirmItem
	};
};

// For backward compatibility, export the same API as useSweetAlert
export default useAppAlert;

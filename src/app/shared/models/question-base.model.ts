export class QuestionBaseModel<T> {
	value: T | undefined;
	key: string;
	label: string;
	disabled: boolean;
	hidden: boolean;
	controlType: string;
	type: string;
	options: any[];
	optionFilter: boolean;
	optionLabel: string;
	optionValue: string;
	onChange?: (_event?: any) => void;
	onClick?: (_event?: any) => void;
	onFocus?: (_event?: any) => void;
	virtualScroll: boolean;
	virtualScrollItemSize: number;
	lazy: boolean;
	onLazyLoad?: (_event?: any) => void;
	virtualScrollOptions: any;
	style: any;
	validates: {
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		pattern?: RegExp;
		isDuplicate?: boolean;
		isPasswordMatch?: boolean;
	};

	constructor(
		options: {
			value?: T;
			key?: string;
			label?: string;
			disabled?: boolean;
			hidden?: boolean;
			onChange?: (_event?: any) => void;
			onClick?: (_event?: any) => void;
			onFocus?: (_event?: any) => void;
			virtualScroll?: boolean;
			virtualScrollItemSize?: number;
			lazy?: boolean;
			onLazyLoad?: (_event?: any) => void;
			virtualScrollOptions?: any;
			controlType?: string;
			type?: string;
			options?: any[];
			optionFilter?: boolean;
			optionLabel?: string;
			optionValue?: string;
			style?: any;
			validates?: {
				required?: boolean;
				minLength?: number;
				maxLength?: number;
				pattern?: RegExp;
				isDuplicate?: boolean;
				isPasswordMatch?: boolean;
			};
		} = {},
	) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.disabled = !!options.disabled;
		this.hidden = !!options.hidden;
		this.onChange = options.onChange;
		this.onClick = options.onClick;
		this.onFocus = options.onFocus;
		this.virtualScroll = !!options.virtualScroll;
		this.virtualScrollItemSize = options.virtualScrollItemSize || 0;
		this.lazy = !!options.lazy;
		this.onLazyLoad = options.onLazyLoad;
		this.virtualScrollOptions = options.virtualScrollOptions || {};
		this.controlType = options.controlType || '';
		this.type = options.type || '';
		this.options = options.options || [];
		this.optionFilter = options.optionFilter || false;
		this.optionLabel = options.optionLabel || '';
		this.optionValue = options.optionValue || '';
		this.style = options.style || {};
		this.validates = options.validates || {};
	}
}

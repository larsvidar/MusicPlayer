/*************** GENERAL FUNCTIONS *****************/
/* Functions not specific to Utdannet.nos solution */
/***************************************************/

/***** IMPORTS *****/
import {SyntheticEvent, KeyboardEvent} from 'react';
import {genObject} from 'types/IGeneral';


/***** FUNCTIONS *****/

/**
 * Function for comparing values in two arrays and returning duplicate values.
 * @param {Array<any>} arr1 - First array to be compared.
 * @param {Array<any>} arr2 - Second array to be compared.
 * @return {Array<any>} Array of duplicate values from both arrays.
 */
export const compareArray = (arr1: any, arr2: any) => {
	arr1 = safeArray(arr1);
	arr2 = safeArray(arr2);

	return arr1.filter((value: any) => {
		return arr2.includes(value);
	});
};

/**
 * Replaces nordic characters with ansi acceptable characters
 * @param {string} str
 * @returns {string}
*/
export const isoToAnsi = (str = '') => {
	const lowerCaseStr = safeString(str.toLocaleLowerCase());
	return lowerCaseStr
		.replace(/ø/g, '+o')
		.replace(/Ø/g, '+O')
		.replace(/æ/g, '+e')
		.replace(/Æ/g, '+E')
		.replace(/å/g, '+a')
		.replace(/Å/g, '+A');
};


/**
 * Replaces ansi characters with iso nordic characters
 * @param {string} str
 * @returns {string}
*/
export const ansiToIso = (str = '') => {
	return str
		.replace(/\+o/g, 'ø')
		.replace(/\+O/g, 'Ø')
		.replace(/\+e/g, 'æ')
		.replace(/\+E/g, 'Æ')
		.replace(/\+a/g, 'å')
		.replace(/\+A/g, 'Å');
};


/**
 * Formats a string into a link-friendly format.
 * @param {string} link string to be formatted
 * @return {string} the formatted string.
 */
export const stringifyLink = (link: string): string => {
	if(link) {
		const newLink = link.toLowerCase()
			.replace(/ø/g, 'o')
			.replace(/æ/g, 'e')
			.replace(/å/g, 'a')
			.replace(/\s/g, '-')
			.replace(/[^a-z0-9-.\s]/g, '');

		return newLink;
	}
	return 'undefined-stringify-link';
};


/**
 * Makes the first character in a string uppercase.
 * @param {string} text string to be formatted.
 * @return {string} text with uppercase first char.
 */
export const capitalize = (text: string): string => {
	if(text && typeof text === 'string') {
		const textArray = text?.split('');
		textArray[0] = textArray[0].toUpperCase();
		return textArray.join('');
	} else {
		return '';
	}
};


/**
 * Adds zero in front of a number if it is lower than 10.
 * @param {number} number to add zero to.
 * @return {string} zerofied-number as string.
 */
export const addZero = (number: number): string => {
	if(typeof number !== 'number') return '0';

	return number < 10 && number > -1
		? '0' + Math.floor(number).toString()
		: Math.floor(number).toString();
};


/**
 * Converts minutes to a string of hours and minutes.
 * @param {number} minutes to be converted.
 * @return {string} Formatted string (eg. 2t 5m)
 */
export const toHours = (minutes: number, loc?: genObject): string => {
	//Language locale
	if(!loc) loc = {
		minutesShort: 'm',
		hoursShort: 't',
	};

	if(!minutes || minutes < 0) return '0 ' + loc.minutesShort;

	return `${Math.floor(minutes / 60)
		? Math.floor(minutes / 60) + loc.hoursShort + ' '
		: ''}${minutes % 60 === 0 ? '' : minutes % 60 + loc.minutesShort}`;
};

/**
 * Converts minutes to a string of minutes and seconds.
 * @param {number} seconds to be converted.
 * @return {string} Formatted string (eg. 2m 5s)
 */
export const toMinutes = (seconds: number, loc?: genObject): string => {
	//Language locale
	if(!loc) loc = {
		secondsShort: 's',
		minutesShort: 'm',
	};

	if(!seconds || seconds < 0) return '0 ' + loc.minutesShort;

	return `${Math.floor(seconds / 60)
		? Math.floor(seconds / 60) + loc.minutesShort + ' '
		: ''}${seconds % 60 === 0 ? '' : seconds % 60 + loc.secondsShort}`;
};


/**
 * Gets file (from formData) and reduces the longest size of the image to 300px.
 * @param {any} file from formData to be reduced.
 * @return {{file: genObject, messages: string[]}} Object with file-object and messages.
 */
export const resizeImage = async (file: File, options: genObject): Promise<{file?: any, messages: string[]}> => {
	const messages: string[] = [];
	if(!(file?.type || '').match(/image\//gi)) {
		messages.push('Invalid file type');
		return {messages};
	}

	//Function for calculating new size of image.
	const getNewSize = (width: number, height: number, size: number) => {
		return width >= height
			? [size, height / (width / size)]
			: [width / (height / size), size];
	};

	/* Variables */
	const fileName = safeString(file.name).split('.')[0]; //get filename from file (except filetype).
	const image = new Image(); //Make new image.
	image.src = URL.createObjectURL(file); //Setting passed file as image-source.
	const canvas = document.createElement('canvas'); //Make new canvas-element.
	const ctx = canvas.getContext('2d') || {} as CanvasRenderingContext2D; //Get context from canvas.


	//Returning a promise that resolves to the new form-data (with the resized image).
	return new Promise((resolve) => {
		//Listener for when source is loaded into image.
		image.onload = () => {
			//Checking if image is bigger than set size.
			const longestSide = Math.max(image.width, image.height);
			const newLongSize = longestSide < options.size ? longestSide : options.size;
			if(longestSide < options.size) messages.push('Bildet er for stort. Reduserer størrelsen');
			//Getting the new size of the image.
			const newSize = getNewSize(image.width, image.height, newLongSize);
			//Setting the canvas to the new image size. 
			canvas.width = newSize[0];
			canvas.height = newSize[1];
			//Drawing the image on the canvas with the new size.
			ctx.drawImage(image, 0, 0, newSize[0], newSize[1]);

			//Making new form-data.
			const formData = new FormData();

			//Getting the image from the canvas, and appending it to form-data.
			if(options.blob) {
				canvas.toBlob(async (blob: any) => {
					//formData.append('files', blob, fileName + '.png');
					//Resolve when new formData is finished.
					const file = new File([blob], fileName + '.png', {type: 'image/png'});
					resolve({file, messages});
				});
			} else {
				canvas.toBlob(async (blob: any) => {
					formData.append('files', blob, fileName + '.png');
					//Resolve when new formData is finished.
					resolve({file: formData, messages});
				});
			}
		};
	});
};


/**
 * Sorts an array of object based on values in passed key.
 * @param {Array<genObject>} array - Array of objects to be sorted.
 * @param {string} key to be sorted by.
 * @param {string='asc'} sort - Optional - Sort order: 'asc' or 'desc'. Default = 'asc'. 
 * @return {Array<genObject>} New array of sorted objects.
 */
export const sortObjectArray = <T extends genObject, >(array: T[], key: string, sort = 'asc'): T[] => {
	//If array is empty, just return array.
	if(!Array.isArray(array) || !array?.length) return [];

	//Returns sorted array
	return [...array].sort((a: any, b: any) => {

		//Checking sort-order.
		const sortFactor = sort.toLowerCase() === 'asc' ? 1 : -1;

		const sortKey = key;

		//Converting to lower-case if property is string.
		const value1 = typeof a[sortKey] === 'string' ? a[sortKey].toLowerCase() : a[sortKey];
		const value2 = typeof b[sortKey] === 'string' ? b[sortKey].toLowerCase() : b[sortKey];

		//comparing values.
		return (value1 || '') > (value2 || '')
			? sortFactor
			: -sortFactor;
	});
};


/**
 * Checks if item is a string.
 * @param {*} value Value to be checked.
 * @return {boolean} Returns true if string, false if not.
 */
export const stringCheck = (value: any): boolean => {
	return typeof value === 'string'
		? true
		: false;
};


/**
 * Gets duration since passed date.
 * @param {number} date Date to count from (UNIX epoch).
 * @param {boolean} short If true, a short-form of the string will be returned.
 * @return {string} A string telling how long ago passed date was.
 */
export const getTimeSince = (date: number, short = false): string => {
	if(!date) {
		return short ? '0 s' : '0 sekunder siden';
	}

	//Get todays date.
	const today: number = Date.now();

	//Get milliseconds since passed date.
	const time: number = today - date;

	//Convert milliseconds to a human-readable string.
	//Seconds...
	const seconds: number = time / 1000;
	if(seconds < 60) return short
		? `${Math.round(seconds)}s`
		: `${Math.round(seconds)} sekunder siden`;

	//Minutes...
	const minutes: number = seconds / 60;
	if(minutes < 60) return short
		? `${Math.round(minutes)}m`
		: `${Math.round(minutes)} minutter siden`;

	//Hours...
	const hours: number = minutes / 60;
	if(hours < 24) return short
		? `${Math.round(hours)}t`
		: `${Math.round(hours)} timer siden`;

	//Days...
	const days: number = hours / 24;
	if(days < 7) return short
		? `${Math.round(days)}d`
		: `${Math.round(days)} dager siden`;

	//Weeks...
	const weeks: number = days / 7;
	if(weeks < 4) return short
		? `${Math.round(weeks)}u`
		: `${Math.round(weeks)} uker siden`;

	//Months...
	const months: number = days / 30.35;
	if(months < 12) return short
		? `${Math.round(months)}mnd`
		: `${Math.round(months)} måneder siden`;

	//Years...
	const years: number = days / 364.25;
	return short
		? `${Math.round(years)}år`
		: `${Math.round(years)} år siden`;
};


/**
 * Checks if passed value is an error-object.
 * @param {any} value Value to be checked.
 * @return {boolean} True if error, false if not.
 */
export const isError = (value: any): value is Error => value instanceof Error
	? true
	: value && value.error
		? true
		: value?.meta?.error
			? true
			: false;


/**
 * Generates a UUID of variable size.
 * @param {number} size - Default value: 16 - Length of UUID-string.
 * @return {string} UUID-string.
 */
export const genUid = (size = 16): string => {
	//Make variable for Uid.
	let code = '';

	//Loop through number of characters
	for(let i = 0; i < size; i++) {

		//Get random number or letter and add it to variable
		if(Math.random() < .3) {
			code += (Math.floor(Math.random() * 10));
		} else {
			code += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
		}
	}

	//Return finished code.
	return code;
};

/*** Escaping inputs ***/
// const hasInvalidChars = /^.*?(?=[\+\^#%&$\*:<>\?/\{\|\}\[\]\\\)\(]).*$/g.test(
//     inputValue,
//   )


/**
 * Formats dates to DD.MM.YYYY format.
 * @param {string | number} rawDate The date to format.
 * @param {string=} format String defining how date should be formatted.
 * @return {string} Formatted date-string. 
 */
export const formatDate = (rawDate: string | number, format?: string): string => {

	//Process date to format.
	let dateNumber: string | number = rawDate;
	if(!rawDate) dateNumber = Date.now();
	if(typeof rawDate === 'string' && rawDate.length < 13 && !isNaN(+rawDate)) dateNumber = +(rawDate + '000');
	if(typeof rawDate === 'number' && rawDate < 1000000000000) dateNumber = rawDate * 1000;
	if(isNaN(+rawDate)) dateNumber = new Date(rawDate).valueOf();


	//Make a date object.
	const date: Date = new Date(+dateNumber);

	//Return data based on format-string
	switch(format) {

		//Return date as "2020"
		case 'year': return date.toLocaleDateString('no-NB', {
			year: 'numeric',
		});

		//Return date as "jan. 2020"
		case 'monthyear': return date.toLocaleDateString('no-NB', {
			month: 'short', year: 'numeric',
		});


		//Return date as "january 2020"
		case 'daymonthyear': return date.toLocaleDateString('no-NB', {
			day: 'numeric', month: 'long', year: 'numeric',
		});

		//Return date as "01.21"
		case 'monthyearNumeric': return date.toLocaleDateString('no-NB', {
			month: 'numeric', year: 'numeric',
		});

		//Return date as a DD.MM.YYYY string.
		default: return date.toLocaleDateString('no-NB', {
			day: '2-digit', month: '2-digit', year: 'numeric',
		});
	}
};


/**
 * Function for turning a query-string into an object.
 * @param {string} queryString Query-string to convert.
 * @return {genObject} 
 */
export const parseQuery = (queryString: string): genObject => {
	queryString = safeString(queryString);
	//Variable for holding final result.
	const queryObject: genObject = {};

	//Check if queryString is not empty, and actually a string.
	if(!queryString || typeof queryString !== 'string') return {};

	//Split query-string from rest of url, and check for errors.
	const query: Array<string> = safeString(decodeURI(queryString)).split('?');

	//if(!query[1]) return new Error('Not a valid query-string.')

	//Split into individual key-value pairs.
	const queryArray: Array<string> = query[1]
		? split(query[1], '&')
		: split(query[0], '&');

	//Iterate through key-pairs and adding them to queryObject.
	queryArray.forEach((item, index) => {
		item = safeString(item);
		const itemArray = item.split('=');

		//If value is present, add it to queryObject...
		if(itemArray[1]) {
			let item: string | string[] = '';

			try {
				item = JSON.parse(itemArray[1]);
			} catch (thisError) {
				item = itemArray[1];
			}

			if(itemArray[0]) queryObject[itemArray[0]] = item;

			//If not, just push string into the single-item.
		} else if(itemArray[0]) {
			if(!queryObject.single) queryObject.single = [];
			queryObject.single[index] = itemArray[0];
		}
	});

	return queryObject;
};


/**
 * Checks if a value is empty or not.
 * Empty objects or arrays, and undefined, null, NaN are all considered empty in this function.
 * Falsy values like 0, '' or false is not considered empty.
 * @param {any} data data to check.
 * @return {boolean} True if empty, false if not.
 */
export const isEmpty = (data: any): boolean => {
	if([undefined, null, NaN].includes(data)) return true;
	if(isError(data)) return false;
	if(typeof data === 'object') {
		if(Array.isArray(data)) return !data.length;

		const keys = Object.keys(data);
		return !keys.length;
	}

	return !data;
};


/**
 * Removes undefined, null and NaN values from objects.
 * @param {any} data to check for undefined values.
 * @return {genObject} Filtered object without undefined values. 
 */
export const removeEmpty = (data: any) => {
	if(typeof data !== 'object') return data;
	if(data instanceof Date) return data;
	if(Array.isArray(data)) return data.filter((value) => !!value);

	const keys: string[] = Object.keys(data);

	const newObject: genObject = {};
	keys.forEach((key: string) => {
		const value = data[key];
		if(!value) if(![false, 0].includes(value)) return;

		const type = typeof value;
		if(type === 'object') {
			if(!(value instanceof Date)) {
				if(Array.isArray(value)) if(!value.length) return;
				if(!Object.keys(value).length) return;
			}
		}

		newObject[key] = value;
	});

	return newObject;
};


/**
 * Simple sleep-function that can be used in async-functions.
 * @param {number} ms Number of milliseconds to wait for.
 * @return {Promise<undefined>} Returns empty promise that are resolved after passed number of milliseconds. 
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};


/**
 * 
 * @param urlPrefix 
 * @param url 
 * @returns 
 */
export const prependUrl = (urlPrefix: string, url: string) => {
	return isWebAdresse(url)
		? url
		: noTrailingSlash(urlPrefix) + prependSlash(url);
};


/**
 * Checks if a value is empty or error.
 * @param {*} value Value to be checked
 * @return {boolean} True if valid, false if empty or error.
 */
export const isValid = (value: any): any => {
	return !value || isEmpty(value)
		? false
		: isError(value)
			? false
			: true;
};


/**
 * @TODO Refactor me to not use .pop()
 * Function for paginate an array. Fetches item from a source array, which is affected directly.
 *
 * @param {any[]} source Source-array to paginate from.
 * @param {number} quantity Number of items to get each time
 */
export function paginateArray<T>(source: T[], quantity: number): T[] {
	const target: any[] = [];
	for(let i = 0; i < quantity; i++) {
		if(!source.length) break;
		target.push(source.pop());
	}

	return target;
}


/**
 * Function for setting console.time-message
 * @param {string} text Text to display in console
 * @param {boolean=} end If true, defines end-message.
 * @return {void}
 */
export const setTime = (text: string, end?: boolean): void => end
	? console.timeEnd(text)
	: console.time(text);


/**
 * Function for sorting an target-array based on the order of a source-array
 * @param {T[]} targetArray Array to be sorted
 * @param {any[]} sourceArray Array with values to sort after.
 * @param {string} compareKey Key to get value from targetArray.
 * @return {T[]} Sorted array.
 */
export const sortFromArray = <T extends genObject, >(targetArray: T[], sourceArray: any[], compareKey: string): T[] => {
	targetArray = safeArray(targetArray);
	sourceArray = safeArray(sourceArray);

	const target: T[] = [];

	sourceArray.forEach((item: any) => {
		const [matchingItem] = targetArray.filter((thisItem: T) => {
			return item === thisItem[compareKey];
		});
		if(matchingItem) target.push(matchingItem);
	});

	return target;
};


/**
 * 
 * @param data 
 * @param type 
 */
export const noError = (data: any, type: string): any => {
	if(!isError(data)) return data;

	switch(type) {
		case 'string': return '';
		case 'number': return 0;
		case 'array': return [];
		case 'boolean': return false;
		default: return {};
	}
};


/**
 * Returns an object with a 'clearAll' method. 
 *  -Timeout-ids can be stored in det object, and clearAll will clear every timeout.
 * @return {genObject} Object with clearAll-method
 */
export const getTimeoutObject = (): genObject => {
	return {
		//Method for clearing all timeouts stored in object.
		clearAll() {
			Object.keys(this).forEach((key: string) => {
				if(key !== 'clearAll') {
					clearTimeout(this[key]);
					clearInterval(this[key]);
					delete this[key];
				}
			});
		}
	} as genObject;
};


/**
 * Applies trim() to all properties in an object that is of type string.
 * @param {genObject} obj Object to process.
 * @return {genObject} Trimmed-object.
 */
export function trimObject<T = genObject>(obj: genObject): T {
	const newObj: any = {};

	for(const key of Object.keys(obj)) {
		newObj[key] = typeof obj[key] === 'string' 
			? obj[key].trim?.()?.replace?.(/\s{2,}/g, ' ') 
			: obj[key];
	}

	return newObj;
}

/**
 * Parses a string to key value pairs
 * Example: a:12,b:34 -> {a: 12, b: 34}
 * 
 * @param {string} str
 * @returns {genObject} 
 */
export const stringToObject = (str: string): genObject => {
	str = safeString(str);
	return str?.split(',')
		.map(val => safeString(val).split(':'))
		.reduce((obj: genObject, [key, val]) => {
			obj[key] = val;
			return obj
		}, {});
};

/**
 * Checks if a value is an object or not, (also not an array);
 * @param {any} value Value to be checked
 * @return {boolean} True if valid object, false if not.
 */
export const isObject = (value: any): value is genObject => {
	if(value instanceof Error) return false;
	return typeof value === 'object' && !Array.isArray(value);
};


/**
 * Function for converting a form-element to an object.
 * @param {HTMLFontElement} form Form to be converted
 * @param {genObject?} target A target-object that the result can be added to.
 * @return {genObject} Object of key-value pairs from form-data;
 */
export const serializeForm = (form: HTMLFormElement, target?: genObject) => {
	//Checking values
	const FAILSAFE = 1000;
	if(!form) return {};
	const targetObject = isObject(target) ? target : {};
    
	//Trying to get entries from form-data.
	const formData = tryCatch(() => new FormData(form).entries());
	if(isError(formData)) return {};
    
	//Iterate through form-data
	let entry: any = formData.next();
	let count = 0;

	while(!entry.done) {
		count++;

		//Check value and assign it if valid.
		if(!entry?.value?.length) {
			entry.done = true;
		} else {
			targetObject[entry.value[0]] = entry.value[1];
			entry = formData.next();
		}

		//To avoid eternal loop
		if(count > FAILSAFE) entry.done = true;
	}

	return targetObject;
};


export function handleEvent<T>(event: SyntheticEvent | KeyboardEvent | Event, stopPropagation = false): T {
	event?.preventDefault?.();
	if(stopPropagation) event?.stopPropagation?.();

	const target = event?.target || {} as EventTarget;
	return target as unknown as T;
}


/**
 * Inserts space between thousands, after 10 000;
 * @param {number} value Number to be formatted.
 * @return {string | number}
 */
export const formatNumber = (value: number, separator = ' ') => {
	return value < 10000
		? value
		: (value / 1000).toFixed(3).replace('.', separator);
};



/**
 * Wraps a try catch-block into one line of code.
 * @param {function} action A function that wraps the function to be called. E.g: tryCatch(() => myFunction(arg1, arg2))
 * @return {any} Returns whatever the passed function returners.
 */
export const tryCatch = function(action: any) {
	try {
		return action();
	} catch (error) {
		return error;
	}
};


/**
 * Stringify a value and print it with specified indention.
 * @param {any} Data to be stringified
 * @param {number} indention number of spaces to indent
 * @return {string}
 */
export const stringify = (data: any, indention = 4): string => {
	return JSON.stringify(data, null, indention);
};


/**
 * Makes a url-parameter string from an object.
 * @param {genObject} params 
 * @return {string}
 */
export const constructParamsString = (params: genObject) => {
	let paramString = '';

	if(!isObject(params)) return paramString;

	for(const item in params) {
		if(!paramString) paramString = '?';
		else paramString += '&';

		paramString += item + '=' + params[item];
	}

	return paramString;
};


/**
 * Opens a new window and navigates to passed url.
 * @param {string} url Url to show in new window.
 * @param {number = 480} width Width of window in pixels. Default: 480.
 * @param {number = 640} height Height of window in pixels. Default: 640. 
 * @param {number} top Number of pixels the window should be placed from the top of the screen
 * @param {number} left Number of pixels the window should be placed from the left edge of the screen
 * @return {Window} A window-object
 */
export const openWindow = (url: string, width = 480, height= 640, top: number, left: number) => {
	//Variables
	if(!top) top = (window?.screen.height / 3) - (height / 2);
	if(!left) left = (window?.screen.width / 2) - (width / 2);

	//Open new window
	const newWindow = window?.open(
		url, 
		'_blank', 
		`top=${top},left=${left},width=${width},height=${height}`
	);
	if(!newWindow) {
		return Error('Kunne ikke åpne vindu for bank-ID. Tillat popups fra siden');
	}

	return newWindow;
};


/**
 * Function for setting and triggering location-hash;
 * @param {string} hash to be set (string without #);
 * @return {void}
 */
export const setHash = (hash: string) => {
	window.location.hash = '';
	window.location.hash = hash;
};


/**
 * Makes sure an array-object is returned.
 * @param {any[]} array Array to be checked
 * @return {any[]} Safe array.
 */
export function safeArray<T>(array?: T[]): T[] {
	if(Array.isArray(array)) return array;
	return [];
}


/**
 * Makes sure a value is a string
 * @param {string} value
 * @return {string} 
 */
export function safeString(value = '') {
	if(typeof value === 'string') return value;
	return '';
}


//Interface for result from appendPagination
interface IPagination<T> {
    result: T[],
    pages: number,
    items: number,
    hasMore: boolean
}

/**
 * Returns items from array depending on page and number of items pr. page.
 * @param {any[]} arr Array of items. 
 * @param {number = 1} page What page to return
 * @param {number = 10} itemsPrPage How many items should be fetched pr. page.
 */
export function appendPagination<T = any>(arr: any[], page = 1, itemsPrPage = 10): IPagination<T> {
	const array = safeArray(arr);
	if(page < 1) page = 1;

	const numberOfItems = page * itemsPrPage;
	const result = array.slice(0, numberOfItems);

	return {
		result,
		pages: Math.ceil(array.length / itemsPrPage),
		items: array.length,
		hasMore: numberOfItems < array.length,
	};
}


export const isWebAdresse = (url: string) => {
	return safeString(url).substr(0, 4) === 'http';
};

export const prependSlash = (url: string) => {
	url = safeString(url);
	return url.substr(0, 1) === '/'
		? url
		: '/' + url;
};


//export const isError = (value: any): value is Error => value instanceof Error

export function isArray<T>(value: any): value is Array<T> {
	if(!value) return false;
	return Array.isArray(value);
}


/**
 * Removes any trailing slashes at the end of a url (or any string).
 * @param {string} url
 * @return {string}
 */
export function noTrailingSlash (url: any) {
	url = safeString(url);

	return url.substr(-1) === '/'
		? url.substr(0, url.length - 1)
		: url;
}


/**
 * Removes any trailing slashes at the beginning of a url (or any string).
 * @param {string} url
 * @return {string}
 */
export function noPreSlash (url: any) {
	url = safeString(url);

	return url.substr(0, 1) === '/'
		? url.substr(1, url.length)
		: url;
}

/**
 * Removes any trailing slashes at the end or/and at the beginning of a string.
 * @param {string} url
 * @return {string}
 */
export function noWrappingSlash (url: any) {
	return noPreSlash(noTrailingSlash(url));
}


/**
 * Separates an url-string into an array of strings. useful for Next.js-routing.
 *   e.g: '/blog/post/' will return ['blog', 'post'].
 * @param {string} url;
 * @returns {string[]}
 */
export const urlToArray = (url: string): string[] => {
	return noWrappingSlash(safeString(url)).split?.('/');
};


/**
 * Gets last slug from url-string
 * @param {string} url 
 * @return {string}
 */
export const getSlug = (url: string) => {
	const urlArray = safeString(noTrailingSlash(url)).split('/');
	return urlArray.reverse()[0];
};


/**
 * Safe version of Array.prototype.map method
 * @param {any[]} arr Array to be mapped 
 * @param {Function} action Function to process each item in array
 * @returns {any[]} Modified array
 */
export function map<T = any>(arr: T[] = [], action: (item: T, index: number) => any = (item) => item): any[] {
	return safeArray(arr).map((item, index = 0) => {
		return action(item, index);
	});
}


/**
 * Safe version of Array.prototype.filter.
 * @param {any[]} arr Array to filter 
 * @param {Function} action Function to determine if item should be filtered out or not.
 * @returns {any[]} Filtered array
 */
export function filter<T = any>(arr: T[] = [], action: (item: T) => boolean = () => false): any[] {
	return safeArray(arr).filter((item) => action(item));
}


/**
 * Safe version of Array.prototype.find.
 * @param {any[]} arr Array to find item in 
 * @param {Function} action Function to find item.
 * @returns {any[]} Filtered array
 */
export function find<T = any>(arr: T[] = [], action: (item: T) => boolean = () => false) {
	return safeArray(arr).find((item) => action(item));
}


/**
 * Safe version of Array.prototype.forEach method.
 * @param {any[]} arr Array to iterate over
 * @param {Function} action Function to run on each item in array.
 * @returns {void} Executes passed function.
 */
export function forEach<T = any>(arr: T[] = [], action: (item: T, index?: number) => any = (item) => item) {
	safeArray(arr).forEach((item, index) => {
		action(item, index);
	});
}


/**
 * Safe version of String.prototype.split method.
 * @param {string} value String to split. 
 * @param {string} param Value to split string on. 
 * @returns {string[]} Returns splitted string.
 */
export function split(value: string, param: string): string[] {
	return safeString(value).split(param);
}


/**
 * Compares to objects to see if values in data-object is different fram same values in source-object.
 *  -Missing properties are not compared.
 * @param {genObject} data Object with properties to check 
 * @param {genObject} source Object with properties to compare against.
 * @returns {boolean} Returns true if any properties in data don't matches same property in source.
 */
export const hasChanges = (source: genObject, data: genObject,) => {
	let hasChanges = false;
	if(!data || !source) return hasChanges;

	forEach(Object.keys(data), (key) => {
		if(data[key] !== source[key]) hasChanges = true;
	});
};


/**
 * Removes objects from array that has identical values for specified key
 * @param {any[]} array Array of objects. 
 * @param {string} key Key to check value of.
 * @returns {any[]} Array with duplicates removed
 */
export const removeDuplicateArrayObjects = (array: any[], key: string) => {
	const newArray: any[] = [];
	const existingValues: any[] = [];
	forEach(array, (item) => {
		if(!existingValues.includes(item[key])) {
			existingValues.push(item[key]);
			newArray.push(item);
		}
	});

	return newArray;
};


/**
 * Converts an object to a string of url-params.
 *  - Only converts values that are strings or numbers.
 * @param {genObject} queryObject 
 * @returns {string}
 */
export const objToUrlParams = (queryObject: genObject) => {
	let queryString = '';
	if(!queryObject) return queryString;
	if(typeof queryObject !== 'object' || isArray(queryObject)) return '';

	const keys = Object.keys(queryObject);
    
	forEach(keys, (key) => {
		const operator = queryString ? '&' : '?';
		const value = queryObject[key];
		const type = typeof value;

		if(['string', 'number', 'boolean'].includes(type)) {
			queryString += operator + key + '=' + value;
		}
		if(Array.isArray(value)) queryString += operator + key + '=' + value.join(',');
	});

	return queryString;
};


/**
 * Function for shifting items in an array forward or backwards
 * @param {any[]} arr An array of anything
 * @param {number} offset Number of items to offset array with
 * @returns {any[]} Returns an array with exactly as many items in it.
 */
export const offsetArray = (arr: any, offset: number) => {
	const newArray: any = [];
	const arrLength = arr.length;

	forEach(arr, (item, index = 0) => {
		let newIndex = index + offset;
		if(newIndex < 0) newIndex = arrLength + newIndex;
		if(newIndex > arrLength) newIndex = newIndex - arrLength;
		newArray[newIndex] = item;
	});

	return newArray.slice(1);
};

/**
 * Function for checking objects are the equal.
 * @param {genObject} object1 First object to be compared
 * @param {genObject} object2 Second object to be compared
 * @returns {boolean} true if object is the same, false is there is a difference.
 */
export const shallowEqualObject = (object1: genObject, object2: genObject) => {
	const keys1  = Object.keys(object1);
	const keys2  = Object.keys(object2);
	// Check if same length 
	if(keys1.length !== keys2.length) {
		return false;
	}
	// Check if objects has same values
	for(const key of keys1) {
		if(object1[key] !== object2[key]) {

			return false;
		}
	}
	return true;
};


/**
 * Removes to many new-lines in a string.
 * @param {string} text Text to be escaped
 * @returns {string} Escaped string.
 */
export const removeExcessiveNewLines = (text: string) => {
	const newText = safeString(text).replace(/[\n|\r]{5,}/gm, '\n\n');
	return newText;
};


/**
 * Remove url-params from an url-string
 * @param {string} url 
 * @returns {string}
 */
export const removeUrlParams = (url: string) => {
	const urlArray = safeString(url).split('?');
	return noTrailingSlash(urlArray[0]);
};


/**
 * Replaces an item in a array based on a query.
 * @param {any[]} array An array with any content 
 * @param {any} updatedItem Item to insert where matching items is found
 * @param {genObject | any} query Query to find items. 
 * 	This can be an object, where defined keys will be matched, or any other values that will be checked for equality.
 * @returns {any[]} Returns array with replaced item.
 */
export function updateArray<T> (array: T[], updatedItem: T, query: genObject | any, keepOldData = false) {
	if(isObject(query)) {
		const keys = Object.keys(query);

		const updatedArray = map(array, (item: any) => {
			if(!isObject(item)) return item;

			let isMatch = true;
			forEach(keys, (key) => {
				if(item[key] !== query[key]) isMatch = false; 
			});

			return !isMatch 
				? item
				: keepOldData
					? {...item, ...updatedItem}
					: updatedItem;
				
		});

		return updatedArray;
	}

	const updatedArray = map(array, (item) => {
		if(!item || !query) return item;
		if(item === query) return updatedItem;
	});

	return updatedArray;
}


/**
 * Takes a url-path and splits it into an array of slugs
 * @param path url-string to process.
 * @returns String array of slugs
 */
export const makePathArray = (path: string) => {
	const safePath = safeString(path);
	const noSlashUrl = noWrappingSlash(safePath);
	const pathArray = split(noSlashUrl, '/');
	const cleanPathArray = removeEmpty(pathArray);
	return cleanPathArray;
};

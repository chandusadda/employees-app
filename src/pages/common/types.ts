import { CancelToken } from "axios";

export interface empStruct {
    name: string,
    email: string,
    phoneNumber: string,
    homeAddress: {
      city: string,
      ZIPCode: string,
      addressLine1: string,
      addressLine2: string
    },
    dateOfEmployment: string,
    dateOfBirth: string,
    _id: string
  }
  
  export interface empsStruct {
    count: number,
    employees: empStruct
  }
  
  export type AlertColor = 'success' | 'info' | 'warning' | 'error';
  
  export interface snackBarProps {
    snackMsg: string,
    openSnack: boolean,
    setOpenSnack: (id: boolean) => void,
    severity: AlertColor
  }

  export interface mainStruct {
    className: string,
    children?: React.ReactNode
  }

  export interface axiosHeaderStruct {
        method: string;
        url: string;
        data: {} | undefined;
        headers: {};
        timeout: number;
        cancelToken: CancelToken;
  }

  export interface pageCardType {
    toLink: string;
    name: string;
    description: string;
  }

  export interface ErrorMessageProps {
    children: React.ReactNode
  }

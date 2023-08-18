export type TConfig = {
    mongoURI: string;
    mongoUser: string;
    mongoPass: string;
    deviceName: string;
};

export type TOpenSession = {
    deviceID: string;
    sessionTimeStartDateObj: Date;
    sessionTimeStartString: string;
};

export type TStartSessionReturn = {
    sessAdded: boolean;
    sessStartTime: Date;
};

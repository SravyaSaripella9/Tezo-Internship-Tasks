export class Option {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
export const locations = [
    {
        key: "1",
        value: "Hyderabad",
    },
    {
        key: "2",
        value: "Bangalore",
    },
    {
        key: "3",
        value: "Chennai",
    },
    {
        key: "4",
        value: "Mumbai",
    },
    {
        key: "5",
        value: "Pune",
    },
    {
        key: "6",
        value: "Delhi",
    }
];
export const departments = [
    {
        key: "1",
        value: "IT",
    },
    {
        key: "2",
        value: "Product Engg",
    },
    {
        key: "3",
        value: "UIUX",
    },
    {
        key: "4",
        value: "HR",
    }
];
export var Status;
(function (Status) {
    Status["Active"] = "Active";
    Status["Inactive"] = "Inactive";
})(Status || (Status = {}));

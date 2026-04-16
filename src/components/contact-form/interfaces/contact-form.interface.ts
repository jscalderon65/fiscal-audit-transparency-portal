export interface IContactFormInfo {
  title: string;
  description: string;
  features: {
    icon: any; // React element/component
    text: string;
  }[];
}

export interface IContactFormData {
  name: string;
  unit: string;
  message: string;
}

export interface IContactFormProps {
  info: IContactFormInfo;
  onSubmit: (data: IContactFormData) => void;
}

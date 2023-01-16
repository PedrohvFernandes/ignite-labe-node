import { Replace } from 'src/helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  // private content: string;
  // private category: string;
  private _id: string;
  private props: NotificationProps;

  // Construtor da classe que recebe os atributos da classe na criação do objeto vindo dela igual no Java
  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  // Get e setters da classe como no Java são para proteger o acesso aos atributos, fazer validações e etc. Ou seja, tipo um middleware

  // Maneira antiga:

  // public getContent(): string {
  //   return this.content;
  // }

  // public setContent(content: string): void {
  //   this.content = content;
  // }

  // public getCategory(): string {
  //   return this.category;
  // }

  // public setCategory(category: string): void {
  //   return this.setCategory(category);
  // }

  // Nova:
  public get content(): Content {
    return this.props.content;
  }

  public set content(content: Content) {
    // Poder fazer validações dentro dos setters, mas iremos usar uma class que faz a validação do conteudo, para que dessa forma não bagunce essa classe de notificação com validações
    // if (content.length < 5) {
    //   throw new Error('Content is too short');
    // }

    this.props.content = content;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  // public set readAt(readAt: Date | null | undefined) {
  //   this.props.readAt = readAt;
  // }
  public read() {
    this.props.readAt = new Date();
  }

  public Unread() {
    this.props.readAt = null;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get id(): string {
    return this._id;
  }
}

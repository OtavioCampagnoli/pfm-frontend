import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { first } from 'rxjs/operators';

import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';

import { Transaction } from 'src/app/shared/model/transaction.model';

import { TransactionType, TransactionTypeLabelMap } from 'src/app/shared/enum/transactionType.enum';
import { TransactionCategory } from 'src/app/shared/enum/transactionCategory.enum';
import { TransactionService } from 'src/app/shared/service/transaction.service';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TransactionFormComponent implements OnInit {


  constructor(private transactionService: TransactionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  loading = false;
  isEdit: boolean = false;
  isProduct: boolean = false;

  transactionList: Transaction[] = [];

  modelRegister: Transaction = new Transaction();

  modelSearch: Transaction = new Transaction();

  transactionTypes: { label: string, value: string }[] = [];

  transactionCategories: { label: string, value: string }[] = [];

  cols: any[] = [];

  @ViewChild('formRegister', { static: false }) formRegister: NgForm | undefined;
  @ViewChild('dt', { static: false }) dt: any;

  ngOnInit(): void {

    this.cols = [
      { field: 'description', header: 'Descrição' },
      { field: 'amount', header: 'Valor' },
      { field: 'category', header: 'Categoria' },
      { field: 'type', header: 'Tipo' },
      { field: 'date', header: 'Data' },
      { field: 'createdAt', header: 'Criado em' }
    ];

    this.transactionTypes = [
      { label: 'Receita', value: 'INCOME' },
      { label: 'Despesa', value: 'EXPENSE' }
    ];

    this.transactionCategories = [
      { label: 'Alimentação', value: 'FOOD' },
      { label: 'Transporte', value: 'TRANSPORT' },
      { label: 'Salário', value: 'SALARY' },
      { label: 'Entretenimento', value: 'ENTERTAINMENT' },
      { label: 'Saúde', value: 'HEALTH' },
      { label: 'Outro', value: 'OTHER' }
    ];

    this.resetSearchForm();
    this.resetformRegister();
  }

  loadTransactions() {
      this.transactionService.listAll().pipe(first()).subscribe(data => {
          this.transactionList = data;
      }, error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error });
      });
  }

  resetSearchForm() {
      this.loadTransactions();
      this.modelSearch =  new Transaction();
  }

  search(event: any) {

      this.transactionService.search(this.modelSearch).pipe(first()).subscribe(data => {
          this.transactionList = data;
      }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
      });
  }

  edit(event: any) {
      let menu = event.data;
      this.resetformRegister();
      this.isEdit = true;

      this.transactionService.getById(menu.id).pipe(first()).subscribe(data => {
          this.modelRegister = data;
      }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
      });
  }

  remove(transaction: Transaction) {
    debugger
      this.confirmationService.confirm({
          message: `Deseja remover ${transaction.description}?`,
          header: 'Excluir registro',
          acceptLabel: 'Confirmar',
          rejectLabel: 'Cancelar',
          accept: () => {
              this.transactionService.delete(transaction.id).pipe(first()).subscribe(data => {
                  if (data) {
                      this.messageService.add({ severity: 'info', summary: 'Removido com sucesso', detail: 'Registro removido com sucesso!' });
                      this.resetSearchForm();
                      this.resetformRegister();
                  }
              }, error => {
                  this.messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: error });
              });
          }
      });
  }

  save() {
      this.transactionService.save(this.modelRegister).pipe(first()).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: `Registro adicionado com sucesso!` });
          this.resetSearchForm();
          this.resetformRegister();
      }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
      });
  }

  resetformRegister() {
      this.modelRegister = new Transaction();
      this.isEdit = false;
      this.isProduct = false;
      this.formRegister && this.formRegister.reset();
  }

  translateCategory(category: string): string {
    let value: string = '';

    const categoryEnum = TransactionCategory[category as keyof typeof TransactionCategory];

    switch (categoryEnum) {
      case TransactionCategory.ENTERTAINMENT:
        value = 'Entretenimento';
        break;
      case TransactionCategory.FOOD:
        value = 'Alimentação';
        break;
      case TransactionCategory.HEALTH:
        value = 'Saúde';
        break;
      case TransactionCategory.OTHER:
        value = 'Outro';
        break;
      case TransactionCategory.SALARY:
        value = 'Salário';
        break;
      case TransactionCategory.TRANSPORT:
        value = 'Transporte';
        break;
      default:
        value = '';
    }

    return value.toUpperCase();
  }

  translateType(type: string) {
    let value: string = '';

    const typeEnum = TransactionType[type as keyof typeof TransactionType];

    switch (typeEnum) {
      case TransactionType.EXPENSE:
        value = 'Despesa';
        break;
      case TransactionType.INCOME:
        value = 'Renda';
        break;
      default:
        value = '';
    }

    return value.toUpperCase();
  }

}

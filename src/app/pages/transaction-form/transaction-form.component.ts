import { ClassifierService } from './../../shared/service/classifier.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { first } from 'rxjs/operators';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Transaction } from 'src/app/shared/model/transaction.model';

import { TransactionService } from 'src/app/shared/service/transaction.service';
import { Table } from 'primeng/table';
import { Classifier } from 'src/app/shared/model/classifier.model';
import { error } from 'console';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TransactionFormComponent implements OnInit {


  constructor(private transactionService: TransactionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private classifierService: ClassifierService
  ) { }

  loading = false;
  isEdit: boolean = false;
  isProduct: boolean = false;

  transactionList: Transaction[] = [];

  modelRegister: Transaction = new Transaction();

  modelSearch: Transaction = new Transaction();

  transactionTypes: Classifier[] = [];

  transactionCategories: Classifier[] = [];

  cols: any[] = [];

  @ViewChild('formRegister', { static: false }) formRegister: NgForm | undefined;
  @ViewChild('dt', { static: false }) dt?: Table;

  ngOnInit(): void {

    this.cols = [
      { field: 'description', header: 'Descrição' },
      { field: 'amount', header: 'Valor' },
      { field: 'categoryCla', header: 'Categoria' },
      { field: 'typeCla', header: 'Tipo' },
      { field: 'date', header: 'Data' },
      { field: 'createdAt', header: 'Criado em' }
    ];

    this.loadTransactionsTypes();
    this.loadTransactionsCategories();
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

  loadTransactionsTypes() {
    this.classifierService.listAllByType("TRANSACTION_TYPE").subscribe(data => {
        this.transactionTypes = data
    }, (error) => {
      console.log(error);
    })
  }

  loadTransactionsCategories() {
    this.classifierService.listAllByType("TRANSACTION_CATEGORY").subscribe(data => {
        this.transactionCategories = data
    }, (error) => {
      console.log(error);
    })
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

}

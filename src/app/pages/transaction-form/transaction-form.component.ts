import { ClassifierService } from './../../shared/service/classifier.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { first } from 'rxjs/operators';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Transaction } from 'src/app/shared/model/transaction.model';

import { TransactionService } from 'src/app/shared/service/transaction.service';
import { Table } from 'primeng/table';
import { Classifier } from 'src/app/shared/model/classifier.model';

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
    this.resetFormRegister();
  }

  loadTransactions() {
      this.transactionService.listAll().subscribe({
        next: (v) => this.transactionList = v,
        error: (e) => this.messageService.add({severity: 'error', summary: 'Erro', detail: e }),
        complete: () => console.log('complete')
      })
  }

  loadTransactionsTypes() {
    this.classifierService.listAllByType("TRANSACTION_TYPE").subscribe({
      next: (v) => this.transactionTypes = v,
      error: (e) => this.messageService.add({severity: 'error', summary: 'Erro', detail: e }),
      complete: () => console.log('complete')

    })
  }

  loadTransactionsCategories() {
    this.classifierService.listAllByType("TRANSACTION_CATEGORY").subscribe({
      next: (v) => this.transactionCategories = v,
      error: (e) => console.error(e),
      complete: () => console.log('complete')
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
      this.resetFormRegister();
      this.isEdit = true;

      this.transactionService.getById(menu.id).pipe(first()).subscribe(data => {
          this.modelRegister = data;
      }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });
      });
  }

  remove(transaction: Transaction) {
      this.confirmationService.confirm({
          message: `Deseja remover ${transaction.description}?`,
          header: 'Excluir registro',
          acceptLabel: 'Confirmar',
          rejectLabel: 'Cancelar',
          accept: () => {
              this.delete(transaction);
          }
      });
  }

  delete(transaction: Transaction) {
    this.transactionService.delete(transaction.id).subscribe({
      next: (v) => {
        this.messageService.add({severity:'success', summary: 'Removido com sucesso', detail: 'Transação removida com sucesso.'})
        this.resetFormRegisterAndLoadTransactions();
      },
      error: (e) => this.messageService.add({severity:'error', summary: 'Erro ao remover', detail: 'Ocorreu um erro ao remover a transação.'}),
      complete: () => console.log("delete complete")
    })
  }

  saveOrUpdate() {
      (this.modelRegister && this.modelRegister.id) ? this.update() : this.save();
  }

  save() {
      this.transactionService.save(this.modelRegister).subscribe({
        next: (v) => {
          this.messageService.add({severity: 'success', summary: "Salvo com sucesso", detail: `Transação criada com sucesso.`})
          this.resetFormRegisterAndLoadTransactions();
        },
        error: (e) => this.messageService.add({severity: 'error', summary: "Erro ao salvar", detail: `Ocorreu um erro ao criar a transação.` }),
        complete: () => console.log("save complete")
      })
  }

  update(){
      this.transactionService.update(this.modelRegister).subscribe({
        next: (v) => {
          this.messageService.add({severity: 'success', summary: "Atualizado com sucesso", detail: `Transação atualizada com sucesso.`})
          this.resetFormRegisterAndLoadTransactions();
        },
        error: (e) => this.messageService.add({severity: 'error', summary: "Erro ao salvar", detail: `Ocorreu um erro ao atualizar a transação.` }),
        complete: () => console.log("update complete")
      })
  }
  resetFormRegister() {
      this.modelRegister = new Transaction();
      this.isEdit = false;
      this.isProduct = false;
      this.formRegister && this.formRegister.reset();
  }

  resetFormRegisterAndLoadTransactions(){
    this.loadTransactions();
    this.resetFormRegister();
  }

}

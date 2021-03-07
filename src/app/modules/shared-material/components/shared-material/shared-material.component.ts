import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

export interface DragDropListItem {
  id: string;
  title: string;
  // description: string;
}
@Component({
  selector: 'app-shared-material',
  templateUrl: './shared-material.component.html',
  styleUrls: ['./shared-material.component.scss']
})
export class SharedMaterialComponent implements OnInit {
  checked: boolean = false;
  indeterminate: boolean = false;
  // labelPosition: 'before' | 'after' = 'after';
  disabled: boolean = false;
  panelOpenState: boolean = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  unassignedTasks: DragDropListItem[] = [
    {
      id: '1',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from'
      // description: 'This is description of tasks 1'
    },
    {
      id: '2',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from'
      // description: 'This is description of tasks 2'
    },
    {
      id: '3',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      // description: 'This is description of tasks 3'
    }
  ];

  assignedTasks = [
    {
      id: '4',
      title: 'Task 4',
      // description: 'This is description of tasks 4'
    },
    {
      id: '5',
      title: 'Task 5',
      // description: 'This is description of tasks 5'
    },
    {
      id: '6',
      title: 'Task 6',
      // description: 'This is description of tasks 6'
    }
  ];

  drop(event: CdkDragDrop<DragDropListItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  result: string = '';
  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
}


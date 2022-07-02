import { NgModule } from "@angular/core";
import { LayananComponent } from "./layanan/layanan.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
    declarations: [LayananComponent],
    imports: [CommonModule,FormsModule,
        IonicModule,],
    exports: [LayananComponent]
})

export class ComponentsModule{}
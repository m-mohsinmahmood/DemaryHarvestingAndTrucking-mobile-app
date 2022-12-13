import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AlertService } from "src/app/alert/alert.service";

@Injectable({
    providedIn: 'root',
})
export class FarmingService {

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    constructor(
        private _httpClient: HttpClient,
        private alertSerice: AlertService
    ) { }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
            this.alertSerice.showAlert({
                type: 'error',
                shake: false,
                slideRight: true,
                title: 'Error',
                message: error.error.message,
                time: 6000,
            });
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            this.alertSerice.showAlert({
                type: 'error',
                shake: false,
                slideRight: true,
                title: 'Error',
                message: error.error.message,
                time: 6000,
            });
        }
    }


    createNewWorkOrder(data: any) {
        this._httpClient
            .post(`http://localhost:7071/api/work-order-farming`, data)
            .pipe(take(1))
            .subscribe(
                (res: any) => {
                    //show notification based on message returned from the api
                    this.alertSerice.showAlert({
                        type: 'success',
                        shake: false,
                        slideRight: true,
                        title: 'Success',
                        message: res.message,
                        time: 5000,
                    });
                },
                (err) => {
                    this.handleError(err);
                },
            );
    }

    getEmployees(
        search: string ,
        status: string = '',
        role: string = '',
        page: number = 1,
        limit: number = 999999,
        sort: string = '',
        order: 'asc' | 'desc' | '' = '',
        // filters: any = { type: '', status: '' }
    ) {
        this._httpClient
        let params = new HttpParams();
        params = params.set('search', search);
        params = params.set('status', status);
        params = params.set('role', role);
        params = params.set('page', page);
        params = params.set('limit', limit);
        params = params.set('search', search);
        params = params.set('sort', sort);
        params = params.set('order', order);

        return this._httpClient
            .get<any>('http://localhost:7071/api/employee', {
                params,
            })
            .pipe(take(1));
        // .subscribe(
        //     (res: any) => {
        //        console.log('res',res);
        //     },
        //     (err) => {
        //         console.log('error,',err);
        //     }
        // );
    }
}
